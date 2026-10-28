# ORÍ Studio — User Journey and Interaction Contract

## Arrival and understanding
Entry points may be a shared social video, a WhatsApp link, a Facebook post or a portfolio project card. The homepage must immediately establish that this is a haircare website concept, show relevant photography and offer "Explore services" and "View the lookbook".

## Discovery
- `/services` shows six named services grouped into protective styling, natural-hair care, and maintenance.
- `/lookbook` shows hairstyle photography with useful descriptions and categories.
- A visitor who selects a relevant style can continue into the booking demo with the service already selected.

## Booking demo
1. **Service:** choose a service; preselect safely from a validated query parameter if supplied.
2. **Date:** choose a preferred date; no past dates allowed. Do not imply live availability.
3. **Time:** choose one of the clearly labeled example preferred time slots.
4. **Review:** confirm the chosen service, date and time; clearly state the action is a demo preview.
5. **End state:** show `Demo complete — this was a preview. No appointment was booked.` with restart and navigation actions.

## Recovery and accessibility
- Validation failures identify the field, guide correction and focus the affected control or error summary.
- Back and forward navigation retains selections where reasonable.
- Mobile menu opens and closes via button, supports Escape, and returns focus appropriately.
- Gallery filtering never silently results in an empty blank page; show meaningful no-results content.
- Screen reader live-region announcements for material state changes, where applicable.
- All controls work with keyboard and visible focus states; reduced-motion preferences are respected.

## Outcome
The visitor understands the service offer and how structured digital booking *could* work, without actually booking a salon appointment.
