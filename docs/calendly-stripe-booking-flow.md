# Calendly and Stripe Booking Flow

Status: Local staging setup in progress. Do not deploy the paid checkout flow
to production until staging has been tested end to end and Jules approves the
public launch.

## Public Calendly Links

- Free Discovery Call:
  https://calendly.com/jules-departmentofconsent/free-discovery-call
- One Coaching Session:
  https://calendly.com/jules-departmentofconsent/one-coaching-session
- Deep Dive Session:
  https://calendly.com/jules-departmentofconsent/deep-dive-session
- Kink Curious to Kink Confident:
  https://calendly.com/jules-departmentofconsent/kink-curious-to-kink-confident
- First Event Preparation:
  https://calendly.com/jules-departmentofconsent/first-event-preparation

The Free Discovery Call link is safe to show publicly. It is a free 20-minute
online meeting with Google Meet and Monday-Friday availability from 10:00 AM to
6:00 PM Pacific.

The paid Calendly links are active in local staging and collect payment through
the connected Stripe account:

- One Coaching Session: 60 minutes, $175.
- Deep Dive Session: 90 minutes default, $250. Calendly still shows a secondary
  60-minute duration option in the editor; verify the public booking flow before
  production launch.
- Kink Curious to Kink Confident: first package session booking, $475.
- First Event Preparation: 90 minutes default, $225. Calendly still shows a
  secondary 60-minute duration option in the editor; verify the public booking
  flow before production launch.

## Site Wiring

- `VITE_BOOKING_URL` points to the Free Discovery Call.
- `VITE_CALENDLY_DISCOVERY_CALL_URL` points to the Free Discovery Call.
- `VITE_CALENDLY_COACHING_SESSION_URL` points to One Coaching Session.
- `VITE_CALENDLY_DEEP_DIVE_URL` points to Deep Dive Session.
- `VITE_CALENDLY_PACKAGE_URL` points to Kink Curious to Kink Confident.
- `VITE_CALENDLY_EVENT_PREP_URL` points to First Event Preparation.
- `VITE_CALENDLY_EVENT_COMPANION_INQUIRY_URL` intentionally remains blank.

When a paid service URL is blank, the pricing page sends that button to `/book`
instead of opening an unpaid Calendly event. Event Companion remains
inquiry-only and must not be exposed as public instant checkout.

## Paid Flow Blockers

The intended paid flow is Calendly booking plus Stripe payment at booking. Do
not publish that flow to production until all of these are complete:

- Paid Calendly event types are tested from the public booking pages.
- Cancellation, refund, rescheduling, package expiration, and Event Companion
  travel terms are approved.
- Production deployment is explicitly approved by Jules.

Current status on July 14, 2026:

- Stripe products and prices exist in the live Department of Consent catalog.
- Stripe can accept charges and payouts.
- Calendly is connected to Stripe for `jules@departmentofconsent.com`.
- Paid Calendly event types have Stripe payment enabled.
- Local staging has the paid Calendly URLs in `.env.local`.

## Stripe Catalog

Live product URLs:

- One Coaching Session:
  https://dashboard.stripe.com/products/doc_one_coaching_session
- Deep Dive Session:
  https://dashboard.stripe.com/products/doc_deep_dive_session
- Kink Curious to Kink Confident:
  https://dashboard.stripe.com/products/doc_kink_curious_to_confident
- First Event Preparation:
  https://dashboard.stripe.com/products/doc_first_event_preparation
- Event Companion:
  https://dashboard.stripe.com/products/doc_event_companion

Live price IDs:

- One Coaching Session: `price_1Tsu93An8TH3bjLkBOb820n7`
- Deep Dive Session: `price_1Tsu94An8TH3bjLkYBzNUDI0`
- Kink Curious to Kink Confident: `price_1Tsu94An8TH3bjLkCZePDcwq`
- First Event Preparation: `price_1Tsu95An8TH3bjLkTTrhQijK`
- Event Companion: `price_1Tsu96An8TH3bjLkTZOyWm6r`

## Event Companion Workflow

1. Visitor submits the `/book` inquiry form or starts with a Free Discovery
   Call.
2. Jules confirms the event, location, timing, expectations, and fit.
3. Send private payment/scheduling only after approval.
4. Never send Event Companion payment or scheduling links until the event,
   location, timing, expectations, and safety fit are approved.
