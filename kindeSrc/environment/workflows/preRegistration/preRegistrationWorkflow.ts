import {
  onUserPreRegistrationEvent,
  WorkflowSettings,
  WorkflowTrigger,
  denyAccess,
  getEnvironmentVariable,
} from "@kinde/infrastructure";

// The settings for this workflow
export const workflowSettings: WorkflowSettings = {
  id: "preRegistration",
  name: "Block disposable emails",
  failurePolicy: {
    action: "stop",
  },
  trigger: WorkflowTrigger.UserPreRegistration,
  bindings: {
    "kinde.env": {},
    "kinde.auth": {},
  },
};

// This workflow allows you to block users from registering with disposable email domains.
//
// In Settings -> Environment variables set up the following variable with the
// * DISPOSABLE_EMAIL_DOMAINS - A comma separated list of disposable email domains
//
// For example, if you want to block users from registering with disposable email domains like
// @yopmail.com, @guerrillamail.com, @mailinator.com, you can set the variable to:
//
// yopmail.com,guerrillamail.com,mailinator.com
//
// You could also hardcode the disposable email domains in the workflow code, but this is not recommended
// as it makes it harder to manage and update the list of disposable email domains.

// The workflow code to be executed when the event is triggered
export default async function Workflow(
  event: onUserPreRegistrationEvent
) {
  console.log("=== preRegistration workflow START ===");
  console.log("handlePreRegistration", event);
  console.log("event keys:", Object.keys(event ?? {}));
  console.log("event.request:", JSON.stringify(event?.request));
  console.log("event.context:", JSON.stringify(event?.context));
  console.log("event.context keys:", Object.keys(event?.context ?? {}));
  console.log("event.context.auth:", JSON.stringify(event?.context?.auth));
  console.log(
    "event.request.authUrlParams:",
    JSON.stringify((event?.request as any)?.authUrlParams)
  );

  // NOTE: `context.user` is not part of the onUserPreRegistrationEvent type,
  // hence the cast. The logs above/below are here to confirm where the email
  // actually lives on the runtime payload.
  const ctx = event.context as any;
  console.log("event.context.user:", JSON.stringify(ctx?.user));
  console.log("event.context.user.email:", ctx?.user?.email);
  console.log("event.context.user.email type:", typeof ctx?.user?.email);

  // Check if user email exists in the event
  if (!ctx.user?.email) {
    console.log(
      "No user email found in pre-registration event, allowing registration"
    );
    return;
  }

  const disposableEmailDomainsVar = getEnvironmentVariable(
    "DISPOSABLE_EMAIL_DOMAINS"
  );
  console.log(
    "DISPOSABLE_EMAIL_DOMAINS raw env var:",
    JSON.stringify(disposableEmailDomainsVar)
  );

  const disposableEmailDomains = disposableEmailDomainsVar?.value;
  console.log("disposableEmailDomains value:", disposableEmailDomains);
  console.log(
    "disposableEmailDomains type:",
    typeof disposableEmailDomains,
    "length:",
    disposableEmailDomains?.length
  );

  // If no disposable email domains are configured, allow registration
  if (!disposableEmailDomains) {
    console.log(
      "No disposable email domains configured, allowing registration"
    );
    console.log("=== preRegistration workflow END (no config) ===");
    return;
  }

  const disposableEmailDomainsArray = disposableEmailDomains
    .split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);
  console.log(
    "disposableEmailDomainsArray:",
    JSON.stringify(disposableEmailDomainsArray)
  );
  console.log(
    "disposableEmailDomainsArray length:",
    disposableEmailDomainsArray.length
  );

  const userEmailDomain = ctx.user.email.split("@")[1]?.trim().toLowerCase();
  console.log("userEmailDomain:", userEmailDomain);
  console.log(
    "is match:",
    disposableEmailDomainsArray.includes(userEmailDomain)
  );

  if (disposableEmailDomainsArray.includes(userEmailDomain)) {
    console.log(
      `Blocking registration for disposable email domain: ${userEmailDomain}`
    );
    denyAccess("Disposable email domain detected");
    console.log("denyAccess called");
  } else {
    console.log(`Allowing registration for email domain: ${userEmailDomain}`);
  }

  console.log("=== preRegistration workflow END ===");
}