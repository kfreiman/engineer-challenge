import { createFileRoute, Link } from "@tanstack/react-router"
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

export const Route = createFileRoute("/")({
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


          <Button variant="link" className="text-muted-foreground">SignUp</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

