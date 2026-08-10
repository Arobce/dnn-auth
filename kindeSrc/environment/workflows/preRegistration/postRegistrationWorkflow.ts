import {
  onPostAuthenticationEvent,
  WorkflowSettings,
  WorkflowTrigger,
  createKindeAPI,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "postAuthenticationAddOrgUser",
  name: "Add authenticated user to test organization",
  failurePolicy: {
    action: "continue",
  },
  trigger: WorkflowTrigger.PostAuthentication,
  bindings: {
    console: {},
    "kinde.fetch": {},
    "kinde.env": {},
    url: {},
  },
};

const TEST_ORG_CODE = "org_f6f1ad202936f";

export default async function onUserPostAuthentication(
  event: onPostAuthenticationEvent
) {
  try {
    const userId = event.context.user.id;

    console.log("userId:", userId);
    console.log("targetOrgCode:", TEST_ORG_CODE);

    if (!userId) {
      console.log("No user ID found");
      return;
    }

    const kindeAPI = await createKindeAPI(event);

    const { data } = await kindeAPI.post({
      endpoint: `organizations/${TEST_ORG_CODE}/users`,
      params: {
        users: [userId],
      } as any,
    });

    console.log(
      "Add organization user response:",
      JSON.stringify(data)
    );
  } catch (error) {
    console.log(
      "Error adding user to organization:",
      JSON.stringify(error)
    );
  }
}