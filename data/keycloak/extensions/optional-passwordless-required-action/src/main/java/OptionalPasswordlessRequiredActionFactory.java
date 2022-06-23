import org.keycloak.Config;
import org.keycloak.authentication.DisplayTypeRequiredActionFactory;
import org.keycloak.authentication.RequiredActionFactory;
import org.keycloak.authentication.RequiredActionProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

public class OptionalPasswordlessRequiredActionFactory implements RequiredActionFactory, DisplayTypeRequiredActionFactory {
    public RequiredActionProvider createDisplay(KeycloakSession keycloakSession, String s) {
        return new OptionalPasswordlessRequiredAction();
    }

    public String getDisplayText() {
        return "Choose if you want to use password-less authentication";
    }

    public RequiredActionProvider create(KeycloakSession keycloakSession) {
        return null;
    }

    public void init(Config.Scope scope) {

    }

    public void postInit(KeycloakSessionFactory keycloakSessionFactory) {

    }

    public void close() {

    }

    public String getId() {
        return OptionalPasswordlessRequiredAction.PROVIDER_ID;
    }
}
