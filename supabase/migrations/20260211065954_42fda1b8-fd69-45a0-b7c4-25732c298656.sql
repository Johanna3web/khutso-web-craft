-- Restrict public read access to contact_messages
-- All reads will go through a secure edge function with admin password validation
CREATE POLICY "No public read access to contact messages"
  ON public.contact_messages
  FOR SELECT
  USING (false);

-- Also block public UPDATE and DELETE
CREATE POLICY "No public update on contact messages"
  ON public.contact_messages
  FOR UPDATE
  USING (false);

CREATE POLICY "No public delete on contact messages"
  ON public.contact_messages
  FOR DELETE
  USING (false);