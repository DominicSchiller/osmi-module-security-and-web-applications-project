import org.keycloak.authentication.InitiatedActionSupport;
import org.keycloak.authentication.RequiredActionContext;
import org.keycloak.authentication.RequiredActionProvider;
import org.keycloak.forms.login.LoginFormsProvider;
import org.keycloak.models.UserModel;

import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import java.util.function.Consumer;
public class OptionalPasswordlessRequiredAction implements RequiredActionProvider {
    public static final String PROVIDER_ID = "choose-passwordless-ra";
    private static final String USE_PASSWORDLESS_FIELD = "use_passwordless";

    public InitiatedActionSupport initiatedActionSupport() {
        return InitiatedActionSupport.SUPPORTED;
    }

    public void evaluateTriggers(RequiredActionContext requiredActionContext) {
        if (requiredActionContext.getUser().getFirstAttribute(USE_PASSWORDLESS_FIELD) == null) {
            requiredActionContext.getUser().addRequiredAction(PROVIDER_ID);
        }
    }

    public void requiredActionChallenge(RequiredActionContext requiredActionContext) {
        // show initial form
        requiredActionContext.challenge(createForm(requiredActionContext, null));
    }

    public void processAction(RequiredActionContext context) {
        // submitted form

        UserModel user = context.getUser();

        MultivaluedMap<String, String> formData = context.getHttpRequest().getDecodedFormParameters();
        String usePasswordless = formData.getFirst(USE_PASSWORDLESS_FIELD);

        user.setSingleAttribute(USE_PASSWORDLESS_FIELD, usePasswordless);

        if(Boolean.getBoolean(usePasswordless)){
            user.addRequiredAction("webauthn-register-passwordless");
        }
        user.removeRequiredAction(PROVIDER_ID);

        context.success();
    }

    public void close() {

    }

    private Response createForm(RequiredActionContext context, Consumer<LoginFormsProvider> formConsumer) {
        LoginFormsProvider form = context.form();
        form.setAttribute("username", context.getUser().getUsername());

        String mobileNumber = context.getUser().getFirstAttribute(USE_PASSWORDLESS_FIELD);
        form.setAttribute(USE_PASSWORDLESS_FIELD, mobileNumber == null ? "" : mobileNumber);

        if (formConsumer != null) {
            formConsumer.accept(form);
        }

        return form.createForm("templates/use-passwordless.ftl");
    }
}
