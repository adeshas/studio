
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageTeamPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Team</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here you will be able to add, edit, and remove team members.</p>
            {/* We will add the content management UI here in a future step. */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
