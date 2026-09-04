# Scheduler and Stripe Booking Flow

Status: Cal.com is the current scheduler for public booking links. Paid services
use Cal.com booking pages with Stripe payment enabled at booking.

## Current Public Links

The site defaults to this Cal.com public profile:

https://cal.com/departmentofconsent

Public Cal.com event links:

- Meet Jules Call:
  https://cal.com/departmentofconsent/meet-jules-call
- One Coaching Session:
  https://cal.com/departmentofconsent/one-coaching-session
- Deep Dive Session:
  https://cal.com/departmentofconsent/deep-dive-session
- Kink Curious to Kink Confident:
  https://cal.com/departmentofconsent/kink-curious-to-kink-confident
- First Event Preparation:
  https://cal.com/departmentofconsent/first-event-preparation
- Event Companion Consultation:
  https://cal.com/departmentofconsent/event-companion-consultation

The Meet Jules Call link is safe to show publicly. It is a free 20-minute
online meeting.

Paid Cal.com links collect payment through the connected live Stripe account:

- One Coaching Session: 60 minutes, $175.
- Deep Dive Session: 90 minutes, $250.
- Kink Curious to Kink Confident: first package session booking, $475.
- First Event Preparation: 90 minutes, $225.

## Site Wiring

- `VITE_BOOKING_URL` can override the global booking link.
- `VITE_CAL_BASE_URL` can point to the Cal.com public profile and derive standard event URLs.
- `VITE_CAL_DISCOVERY_CALL_URL` points to the Meet Jules Call.
- `VITE_CAL_COACHING_SESSION_URL` points to One Coaching Session.
- `VITE_CAL_DEEP_DIVE_URL` points to Deep Dive Session.
- `VITE_CAL_PACKAGE_URL` points to Kink Curious to Kink Confident.
- `VITE_CAL_EVENT_PREP_URL` points to First Event Preparation.
- `VITE_CAL_EVENT_COMPANION_INQUIRY_URL` should point to a consultation, not instant checkout.
- `VITE_CALENDLY_*` values are legacy fallback only.

When a paid service URL is blank, the pricing page sends that button to `/book`.
Event Companion remains consultation-only and must not be exposed as public
instant checkout.

## Launch Checklist

Before a major production push, recheck:

- Public Cal.com event pages load.
- Paid Cal.com event pages show the intended Stripe payment amounts.
- Cancellation, refund, rescheduling, package expiration, and Event Companion
  travel terms still match approved copy.
- The public Cal.com profile shows only Department of Consent booking links.

Current status on July 21, 2026:

- Stripe products and prices exist in the live Department of Consent catalog.
- Stripe can accept charges and payouts.
- Cal.com Google Calendar is connected.
- Cal.com Stripe payment is connected.
- Paid Cal.com event types have payment enabled.
- Cal.com default starter events are hidden from the public profile.

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
