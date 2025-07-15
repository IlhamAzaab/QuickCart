import { serve } from "inngest/next";
import { inngest } from "@/components/config/inngest";
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
} from "@/components/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
