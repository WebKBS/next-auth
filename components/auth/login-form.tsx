import CardWrapper from "@/components/auth/card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Back to Home"
      backButtonHref="/"
      showSocial={true}
    >
      LoginForm
    </CardWrapper>
  );
};

export default LoginForm;
