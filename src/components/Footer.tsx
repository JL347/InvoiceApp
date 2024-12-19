import Container from "@/components/Container";

const Footer = () => {
  return (
    <header className="mt-12 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">
          Invoice App &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm">
          Created by Jared Lemke with Next.js, Xata and Clerk.
        </p>
      </Container>
    </header>
  );
}

export default Footer;