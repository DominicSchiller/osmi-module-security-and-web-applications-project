package dominicschiller.keycloak.requireaction;

import org.keycloak.Config;
import org.keycloak.authentication.DisplayTypeRequiredActionFactory;
import org.keycloak.authentication.RequiredActionFactory;
import org.keycloak.authentication.RequiredActionProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

public class OptionalPasswordlessRequiredActionFactory implements RequiredActionFactory, DisplayTypeRequiredActionFactory {
    @Override
    public RequiredActionProvider createDisplay(KeycloakSession keycloakSession, String s) {
        return create(keycloakSession);
    }

    @Override
    public String getDisplayText() {
        return "Choose Passwordless Authentication";
    }

    @Override
    public RequiredActionProvider create(KeycloakSession keycloakSession) {
        return new OptionalPasswordlessRequiredAction();
    }


    @Override
    public void init(Config.Scope scope) {

    }

    @Override
    public void postInit(KeycloakSessionFactory keycloakSessionFactory) {

    }

    @Override
    public void close() {

    }

    @Override
    public String getId() {
        return OptionalPasswordlessRequiredAction.PROVIDER_ID;
    }
}
