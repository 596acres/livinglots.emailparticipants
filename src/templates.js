module.exports = function(Handlebars) {

var templates = {};

templates["failure.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"map-mail-mode-container\">\n    <h1>Failure</h1>\n    <p>Something went wrong while trying to email organizers. Sorry about that.</p>\n    <p>Please try again and let us know if it continues to fail.</p>\n    <div class=\"map-mail-actions\">\n        <a href=\"#\" class=\"mail-mode-cancel btn btn-default\">close</a>\n    </div>\n</div>\n";
  },"useData":true});

templates["success.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"map-mail-mode-container\">\n    <h1>Success</h1>\n    <p>Successfully sent your emails with subject \""
    + escapeExpression(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subject","hash":{},"data":data}) : helper)))
    + "\" to "
    + escapeExpression(((helper = (helper = helpers.organizers || (depth0 != null ? depth0.organizers : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"organizers","hash":{},"data":data}) : helper)))
    + " organizers ("
    + escapeExpression(((helper = (helper = helpers.emails || (depth0 != null ? depth0.emails : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"emails","hash":{},"data":data}) : helper)))
    + " unique addresses).</p>\n    <div class=\"map-mail-actions\">\n        <a href=\"#\" class=\"mail-mode-cancel btn btn-default\">close</a>\n    </div>\n</div>\n";
},"useData":true});

templates["window.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "disabled";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"map-mail-mode-container\">\n    <h1>Email Organizers</h1>\n    <div class=\"map-mail-status\">\n        You are sending email to "
    + escapeExpression(((helper = (helper = helpers.organizers || (depth0 != null ? depth0.organizers : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"organizers","hash":{},"data":data}) : helper)))
    + " organizers ("
    + escapeExpression(((helper = (helper = helpers.emails || (depth0 != null ? depth0.emails : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"emails","hash":{},"data":data}) : helper)))
    + " unique addresses).\n    </div>\n    <form class=\"mail-mode-form\">\n        <input type=\"hidden\" name=\"emails\" value=\""
    + escapeExpression(((helper = (helper = helpers.emails || (depth0 != null ? depth0.emails : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"emails","hash":{},"data":data}) : helper)))
    + "\" />\n        <input type=\"text\" class=\"form-control\" name=\"subject\" placeholder=\"subject\" value=\""
    + escapeExpression(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subject","hash":{},"data":data}) : helper)))
    + "\" />\n        <textarea class=\"form-control\" name=\"text\" placeholder=\"text\">"
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "</textarea>\n    </form>\n    <div class=\"map-mail-actions\">\n        <a href=\"#\" class=\"mail-mode-cancel btn btn-default\">cancel</a>\n        <button type=\"submit\" class=\"mail-mode-submit btn btn-default\" ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.disabled : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">send emails</button>\n    </div>\n</div>\n";
},"useData":true});

return templates;

};