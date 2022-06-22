<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('use_passwordless'); section>
    <#if section = "header">
        ${"Choose passwordless"}
    <#elseif section = "form">
        <h2>Choose passwordless</h2>
        <p></p>
        <form id="kc-mobile-update-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="use-passwordless"class="${properties.kcLabelClass!}">Use passwordless</label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="checkbox" id="use_passwordless" name="use_passwordless" class="${properties.kcInputClass!}"
                           value="${use_passwordless}"/>
                </div>
            </div>
            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}"/>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>
