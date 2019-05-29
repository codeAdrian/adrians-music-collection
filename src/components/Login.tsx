import React from "react";
import defineForm from "react-define-form";
import { Input } from "components";
import { FieldRenderProps } from "react-define-form";
import { useFirebaseAuth } from "hooks";

const { Form, Fields } = defineForm(f => ({
  email: f<string>(),
  password: f<string>()
}));

const Login: React.FC = () => {
  const { signIn } = useFirebaseAuth();

  return (
    <section className="login">
      <article className="login__wrapper">
        <h1 className="heading heading--level2">Login</h1>
        <p className="paragraph">You have to log in to view this page.</p>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={signIn}
          render={({ handleSubmit }) => (
            <form className="login__form" onSubmit={handleSubmit}>
              <Fields.email render={getEmailInput} />
              <Fields.password render={getPasswordInput} />
              <button
                className="button button--cta login__button"
                type="submit"
              >
                Log in
              </button>
            </form>
          )}
        />
      </article>
    </section>
  );

  function getEmailInput({
    input,
    meta
  }: FieldRenderProps<string, "email", any>) {
    return <Input label="Email" type="email" meta={meta} required {...input} />;
  }

  function getPasswordInput({
    input,
    meta
  }: FieldRenderProps<string, "password", any>) {
    return (
      <Input label="Password" type="password" meta={meta} required {...input} />
    );
  }
};

export { Login };
