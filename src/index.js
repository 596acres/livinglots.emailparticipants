var L = require('leaflet');
var Handlebars = require('handlebars');
var _ = require('underscore');
var Spinner = require('spin.js');

var templates = require('./templates')(Handlebars);

var $parent,
    cancelButtonSelector = '.mail-mode-cancel',
    submitButtonSelector = '.mail-mode-submit',
    formSelector = '.mail-mode-form';

function getDjangoUrl(name) {
    try {
        return Django.url(name);
    }
    catch (e) {
        return undefined;
    }
}

var defaultOptions = {
    emailOrganizersCountUrl: getDjangoUrl('lots:lot_count_organizers'),
    sendEmailUrl: getDjangoUrl('lots:lot_email_organizers')
};

L.Map.include({
    _initEmailParticipants: function () {
        L.setOptions(this, _.defaults(this.options, defaultOptions));

        try {
            $parent = $('<div></div>').addClass('map-mail-parent');
            $parent.css('top', $('#map').offset().top);
            $('body').append($parent);
        }
        catch (e) {
            console.info('livinglots.emailparticipants not loaded');
        }
    },

    replaceMailWindowContent: function (content) {
        $('.map-mail-mode-container').remove();
        $parent.append(content);
        this.fire('mailwindowchange');
    },

    sendMail: function () {
        var map = this,
            params = this.getParamsQueryString({}, {
                bbox: this.getBounds().toBBoxString(),
                subject: $(formSelector).find(':input[name=subject]').val(),
                text: $(formSelector).find(':input[name=text]').val()
            });

        var spinner = new Spinner()
            .spin($parent[0]);

        $.getJSON(this.options.sendEmailUrl + '?' + params)
            .always(function () {
                spinner.stop();
            })
            .done(function (data) {
                map.replaceMailWindowContent(templates['success.hbs'](data));
            })
            .fail(function (data) {
                map.replaceMailWindowContent(templates['failure.hbs'](data));
            });
    },

    mailSubmitDisabled: function (subject, text, emailCount) {
        return (subject === '' || text === '' || emailCount === 0);
    },

    updateMailWindow: function () {
        var map = this,
            params = this.getParamsQueryString({}, {
                bbox: this.getBounds().toBBoxString()
            });

        var subject = $(formSelector).find(':input[name=subject]').val(),
            text = $(formSelector).find(':input[name=text]').val();
        $.getJSON(this.options.emailOrganizersCountUrl + '?' + params, function (data) {
            _.extend(data, {
                disabled: map.mailSubmitDisabled(subject, text, data.emails),
                subject: subject,
                text: text
            });
            map.replaceMailWindowContent(templates['window.hbs'](data));

            // Watch for changes on form to determine whether submit should be
            // enabled
            $(formSelector).find(':input').keyup(function () {
                var subject = $(formSelector).find(':input[name=subject]').val(),
                    text = $(formSelector).find(':input[name=text]').val(),
                    emails = $(formSelector).find(':input[name=emails]').val(),
                    disabled = map.mailSubmitDisabled(subject, text, emails);
                $(submitButtonSelector).prop('disabled', disabled);
            });
        });
    },

    enterMailMode: function () {
        $parent.addClass('on');
        this.updateMailWindow();
        this.fire('entermode', { name: 'mail' });
        var map = this;

        // Update window on filters / map change
        this.on({
            'moveend': function () {
                map.updateMailWindow();
            },
            'zoomend': function () {
                map.updateMailWindow();
            },
            'filterschanged': function () {
                map.updateMailWindow();
            }
        });

        this.on('entermode', function (data) {
            if (data.name !== 'mail') {
                map.exitMailMode();
            }
        });

        $('body').on('click', cancelButtonSelector, function (e) {
            map.exitMailMode();
            e.stopPropagation();
            return false;
        });

        $('body').on('click', submitButtonSelector, function (e) {
            // If already disabled, don't send mail
            if ($(submitButtonSelector).is('.disabled')) {
                return false;
            }
            $(submitButtonSelector).addClass('disabled');
            map.sendMail();
            e.stopPropagation();
            return false;
        });
    },

    exitMailMode: function () {
        $parent.removeClass('on');
        $('.map-mail-mode-container').hide();
        this.fire('exitmode', { name: 'mail' });
    }
});

L.Control.EmailParticipants = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar email-participants-control'),
            link = L.DomUtil.create('a', 'email-participants-control-button', container);
        $(link).on('click', function () {
            map.enterMailMode();
        });
        return container;
    }
});

L.Map.addInitHook('_initEmailParticipants');

L.control.emailParticipants = function (opts) {
    return new L.Control.EmailParticipants(opts);
};
