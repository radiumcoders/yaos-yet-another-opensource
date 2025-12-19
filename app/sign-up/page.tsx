import { AuthForm } from "@/components/actions/auth-form";
import Container from "@/components/core/container";

function Page() {
  return (
    <Container className="flex h-full w-full items-center justify-center p-6 md:p-10">
      <AuthForm type="sign-up" className="w-full max-w-sm" />
    </Container>
  );
}

export default Page;
