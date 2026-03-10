import { createFileRoute, Link, redirect } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { KeyRound } from "lucide-react"
import { oryCli } from "@/lib/auth"
import { ResponseError } from "@ory/client-fetch"

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      await oryCli.toSession();
      // If user has a session, redirect to profile
      throw redirect({ to: "/profile" });
    } catch (err) {
      // If it's a 401/403, user is not logged in - show login page
      if (err instanceof ResponseError && (err.response.status === 401 || err.response.status === 403)) {
        console.log("User not logged in, showing login page");
        return;
      }
      // For any other error (including 307 redirects), re-throw to let TanStack Router handle it
      throw err;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <KeyRound />
          </EmptyMedia>
          <EmptyTitle>Project Description</EmptyTitle>
          <EmptyDescription>
            To log in to your personal account, use the buttons below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Link to="/auth/login"><Button>Login</Button></Link>

          <Link to="/auth/registration">
            <Button variant="link" className="text-muted-foreground">SignUp</Button>
          </Link>

        </EmptyContent>
      </Empty>
    </div>
  )
}

