import {
  onPostAuthenticationEvent,
  WorkflowSettings,
  WorkflowTrigger,
  createKindeAPI,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "postAuthenticationOrgProperties",
  name: "Read organization properties",
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

export default async function onUserPostAuthentication(
  event: onPostAuthenticationEvent
) {
  try {
    console.log(
      "authUrlParams:",
      JSON.stringify(event.request.authUrlParams)
    );

    // const orgCode = event.request.authUrlParams?.orgCode;

    // console.log("orgCode:", orgCode);

    // if (!orgCode) {
    //   console.log("No orgCode found");
    //   return;
    // }

    // const kindeAPI = await createKindeAPI(event);

    // const { data } = await kindeAPI.get({
    //   endpoint: `organizations/${orgCode}/properties`,
    // });

    // console.log(
    //   "Organization properties:",
    //   JSON.stringify(data)
    // );
  } catch (error) {
    console.log(
      "Error fetching organization properties:",
      JSON.stringify(error)
    );
  }
}