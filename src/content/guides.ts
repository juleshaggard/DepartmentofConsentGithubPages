/**
 * Guide content — editorial source of truth is copy.md at the repo root.
 * Only minor edits for interface length or grammar are permitted here.
 */

export type GuideBlock =
  | { t: "p"; text: string }
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "def"; term: string; text: string }
  | { t: "links"; items: { label: string; to: string }[] };

export type GuideSection = { heading?: string; blocks: GuideBlock[] };

export type Guide = {
  slug: string;
  path: string;
  crumbLabel: string;
  title: string;
  description: string;
  h1: string;
  datePublished: string;
  dateModified?: string;
  intro: GuideBlock[];
  sections: GuideSection[];
  cta: { headline: string; body?: string; label: string; to: string };
  related: { label: string; to: string }[];
};

const PUBLISHED = "2026-07-09";

export const guideFirstKinkEvent: Guide = {
  slug: "preparing-for-your-first-kink-event",
  path: "/guides/preparing-for-your-first-kink-event",
  crumbLabel: "Preparing for Your First Kink Event",
  title: "Preparing for Your First Kink Event | Beginner Guide",
  description:
    "Prepare for your first kink event with clear advice on event types, clothing, consent, etiquette, participation, privacy, substances, and exit planning.",
  h1: "Preparing for Your First Kink Event",
  datePublished: PUBLISHED,
  intro: [
    {
      t: "p",
      text: "Your first kink event may feel intimidating because you are entering a social environment with unfamiliar language, expectations, and rules.",
    },
    {
      t: "p",
      text: "The first thing to know is that “kink event” can describe several very different experiences. A casual social gathering in ordinary clothes is not the same as an educational workshop, a dance party, or a venue where people may engage in kink activities.",
    },
    {
      t: "p",
      text: "Choosing the right kind of event matters more than trying to look experienced.",
    },
  ],
  sections: [
    {
      heading: "1. Identify the type of event",
      blocks: [
        { t: "p", text: "Common event types include:" },
        {
          t: "list",
          items: [
            "Social gatherings where people meet and talk",
            "Educational classes or demonstrations",
            "Discussion groups",
            "Dance parties or nightlife events",
            "Play parties where kink activities may happen",
            "Private gatherings that require an invitation or screening",
          ],
        },
        {
          t: "p",
          text: "A social event may be a better first step than a play-focused event. A class may be useful if you want structure. A larger party may be exciting but harder to understand when you are new.",
        },
        { t: "p", text: "Read the description rather than relying on the event title." },
      ],
    },
    {
      heading: "2. Check whether it welcomes beginners",
      blocks: [
        { t: "p", text: "Look for direct language such as:" },
        {
          t: "list",
          items: [
            "Beginner-friendly",
            "Newcomer orientation",
            "First-timers welcome",
            "Introductory class",
            "Volunteer greeters",
            "Orientation required",
          ],
        },
        {
          t: "p",
          text: "If the description assumes you already know the rules, requires references, or does not explain admission, it may not be the right first event.",
        },
        { t: "p", text: "Contact the organizer when something important is unclear." },
      ],
    },
    {
      heading: "3. Read every rule",
      blocks: [
        { t: "p", text: "Venue and event rules can cover:" },
        {
          t: "list",
          items: [
            "Age and identification requirements",
            "Dress codes",
            "Phone and photography policies",
            "Alcohol and substance use",
            "Consent expectations",
            "Areas where activity is allowed",
            "Equipment use",
            "Privacy",
            "Admission and re-entry",
            "Required orientation",
            "What can lead to removal",
          ],
        },
        { t: "p", text: "Do not assume the rules are the same at every event." },
      ],
    },
    {
      heading: "4. Decide what you want from the night",
      blocks: [
        { t: "p", text: "Your goal might be:" },
        {
          t: "list",
          items: [
            "See what the community feels like",
            "Attend a class",
            "Meet people",
            "Observe",
            "Learn the venue layout",
            "Practice saying hello",
            "Stay for one hour and leave",
          ],
        },
        {
          t: "p",
          text: "You do not need to play, flirt, exchange contact information, or prove that you belong.",
        },
        { t: "p", text: "Observation can be a complete first experience." },
      ],
    },
    {
      heading: "5. Choose clothing for the actual event",
      blocks: [
        {
          t: "p",
          text: "Some events happen in ordinary public venues and expect everyday clothing. Others encourage fetishwear, lingerie, leather, formalwear, costumes, or partial nudity.",
        },
        {
          t: "p",
          text: "Follow the event description. When in doubt, wear something that meets the rules and allows you to feel comfortable rather than trying to perform an identity.",
        },
        {
          t: "p",
          text: "Bring a layer or change of clothes if the venue, weather, or transportation makes that useful.",
        },
      ],
    },
    {
      heading: "6. Learn basic consent and observation etiquette",
      blocks: [
        {
          t: "p",
          text: "Do not touch another person, their clothing, their equipment, or their belongings without permission.",
        },
        {
          t: "p",
          text: "Do not assume that watching an activity gives you permission to stand extremely close, comment, interrupt, or join.",
        },
        {
          t: "p",
          text: "Do not treat a title such as dominant, submissive, master, mistress, or switch as authority over someone who has not agreed to that dynamic.",
        },
        { t: "p", text: "A person can change their mind at any time." },
      ],
    },
    {
      heading: "7. Keep your phone away",
      blocks: [
        {
          t: "p",
          text: "Many kink events restrict phones or photography because privacy matters.",
        },
        {
          t: "p",
          text: "Even when phones are allowed in part of a venue, do not photograph, record, livestream, tag, or identify people without explicit permission.",
        },
        {
          t: "p",
          text: "The safest default is to keep your phone put away unless you are in a designated area.",
        },
      ],
    },
    {
      heading: "8. Be careful with alcohol and other substances",
      blocks: [
        {
          t: "p",
          text: "Substances can affect judgment, communication, coordination, memory, and the ability to give or interpret consent.",
        },
        {
          t: "p",
          text: "Some events are sober. Some restrict play after drinking. Some venues serve alcohol but expect participants to manage themselves.",
        },
        {
          t: "p",
          text: "You do not need to use a substance to calm your nerves. Being fully present may make your first event easier to evaluate.",
        },
      ],
    },
    {
      heading: "9. Make an exit plan",
      blocks: [
        { t: "p", text: "Know:" },
        {
          t: "list",
          items: [
            "How you are getting there",
            "How you are getting home",
            "Whether you can leave and return",
            "Where your belongings will be",
            "Who you can contact",
            "What time you plan to reassess",
            "What would make you leave immediately",
          ],
        },
        { t: "p", text: "Do not depend on a new acquaintance for transportation." },
        { t: "p", text: "You can leave without explaining yourself." },
      ],
    },
    {
      heading: "10. Debrief afterward",
      blocks: [
        { t: "p", text: "Ask yourself:" },
        {
          t: "list",
          items: [
            "Did I feel respected?",
            "Did the rules match what happened?",
            "Did I feel pressure to participate?",
            "What made me curious?",
            "What made me uncomfortable?",
            "Did I like the event, or only the idea of it?",
            "Would a different event format suit me better?",
            "Is there anyone I want to follow up with?",
            "Is there anyone I do not want to hear from again?",
          ],
        },
        { t: "p", text: "You do not need to decide what the experience means immediately." },
      ],
    },
    {
      heading: "When private preparation helps",
      blocks: [
        {
          t: "p",
          text: "A private preparation session can help you choose an event, interpret the rules, decide what to wear, prepare boundaries, practice declining invitations, and build an exit plan.",
        },
        {
          t: "p",
          text: "For selected San Francisco Bay Area events, nonsexual accompaniment may also be available.",
        },
        {
          t: "links",
          items: [
            { label: "Kink event accompaniment", to: "/services/kink-event-accompaniment" },
            { label: "Kink coaching in San Francisco", to: "/services/kink-coach-san-francisco" },
          ],
        },
      ],
    },
  ],
  cta: {
    headline: "Want help preparing for a specific event?",
    body: "A private preparation session covers the event type, rules, etiquette, boundaries, clothing, participation expectations, and your exit plan.",
    label: "Explore first event support",
    to: "/services/kink-event-accompaniment",
  },
  related: [
    { label: "How to Enter the Kink Scene", to: "/guides/how-to-enter-the-kink-scene" },
    { label: "How to Negotiate Your First Scene", to: "/guides/how-to-negotiate-your-first-scene" },
    { label: "Kink Red Flags Beginners Should Know", to: "/guides/kink-red-flags-for-beginners" },
  ],
};

export const guideEnterTheScene: Guide = {
  slug: "how-to-enter-the-kink-scene",
  path: "/guides/how-to-enter-the-kink-scene",
  crumbLabel: "How to Enter the Kink Scene",
  title: "How to Enter the Kink Scene | Beginner Guide",
  description:
    "A practical beginner guide to entering the kink scene, finding events, learning etiquette, protecting privacy, vetting people, and exploring at your own pace.",
  h1: "How to Enter the Kink Scene Without Pretending You Already Belong",
  datePublished: PUBLISHED,
  intro: [
    { t: "p", text: "You do not enter “the kink scene” through one door." },
    {
      t: "p",
      text: "Kink communities are made up of social groups, educational spaces, online platforms, private events, public nightlife, friend networks, and people with very different interests and values.",
    },
    {
      t: "p",
      text: "The goal is not to become an insider as quickly as possible. The goal is to find a first step that gives you useful information without surrendering your judgment.",
    },
  ],
  sections: [
    {
      heading: "1. Begin with what you already know",
      blocks: [
        { t: "p", text: "You may know:" },
        {
          t: "list",
          items: [
            "A fantasy you keep returning to",
            "A role that interests you",
            "A sensation you want to understand",
            "A relationship dynamic that appeals to you",
            "A type of event you are considering",
            "A desire to meet people who can talk openly about kink",
          ],
        },
        { t: "p", text: "You do not need to convert that interest into a permanent identity." },
        { t: "p", text: "“Curious” is enough information to begin learning." },
      ],
    },
    {
      heading: "2. Learn enough language to ask better questions",
      blocks: [
        { t: "p", text: "You do not need to memorize a glossary." },
        { t: "p", text: "Start with terms that affect the situation you are considering:" },
        { t: "def", term: "Scene", text: "a planned period of kink activity." },
        { t: "def", term: "Negotiation", text: "the conversation before activity." },
        { t: "def", term: "Limit", text: "something a person does not want." },
        { t: "def", term: "Safeword or signal", text: "a way to pause or stop." },
        {
          t: "def",
          term: "Aftercare",
          text: "support or attention people may want afterward.",
        },
        {
          t: "def",
          term: "Vetting",
          text: "gathering information before trusting someone or entering a situation.",
        },
        {
          t: "def",
          term: "Munch",
          text: "a casual social gathering, usually in ordinary clothes, where kink-interested people meet and talk.",
        },
        {
          t: "p",
          text: "Language is useful when it helps people communicate. It is not a test of whether you belong.",
        },
      ],
    },
    {
      heading: "3. Choose education before intensity",
      blocks: [
        {
          t: "p",
          text: "A beginner class, discussion group, or social gathering can teach you more than immediately pursuing the most intense version of a fantasy.",
        },
        { t: "p", text: "Look for events that explain:" },
        {
          t: "list",
          items: [
            "Who the event is for",
            "Whether beginners are welcome",
            "What happens there",
            "What participation is expected",
            "What the rules are",
            "How privacy is handled",
            "Who to contact with questions",
          ],
        },
        {
          t: "p",
          text: "Ambiguity is not automatically dangerous, but it is not a good foundation for your first experience.",
        },
      ],
    },
    {
      heading: "4. Protect your privacy deliberately",
      blocks: [
        {
          t: "p",
          text: "Decide what name, face, workplace, relationship information, location, and social accounts you are comfortable connecting to kink spaces.",
        },
        {
          t: "p",
          text: "Online privacy is not perfect. A separate profile can reduce casual crossover, but it cannot guarantee anonymity.",
        },
        {
          t: "p",
          text: "Do not share more personal information because someone claims secrecy is a sign of distrust.",
        },
      ],
    },
    {
      heading: "5. Meet people without treating every interaction as an audition",
      blocks: [
        { t: "p", text: "Your first goal can be a conversation." },
        {
          t: "p",
          text: "You do not need to find a dominant, submissive, partner, or playmate immediately.",
        },
        { t: "p", text: "Pay attention to how people respond when you:" },
        {
          t: "list",
          items: [
            "Ask a basic question",
            "Say no",
            "Change the subject",
            "Move slowly",
            "Decline to share personal details",
            "Seek an outside opinion",
          ],
        },
        {
          t: "p",
          text: "People reveal a great deal when they do not get immediate access to you.",
        },
      ],
    },
    {
      heading: "6. Vet without expecting certainty",
      blocks: [
        { t: "p", text: "Vetting can include:" },
        {
          t: "list",
          items: [
            "Talking more than once",
            "Meeting in public",
            "Asking about experience",
            "Asking how they handle mistakes",
            "Discussing boundaries and safety",
            "Speaking with references when appropriate",
            "Checking whether stories remain consistent",
            "Asking trusted community members for context",
            "Watching how they treat people they do not want anything from",
          ],
        },
        { t: "p", text: "Vetting reduces uncertainty. It does not prove someone is safe." },
      ],
    },
    {
      heading: "7. Learn the difference between confidence and pressure",
      blocks: [
        { t: "p", text: "Confidence sounds like:" },
        {
          t: "list",
          items: [
            "“Here is what I enjoy.”",
            "“Here is how I usually approach this.”",
            "“Take your time.”",
            "“You can say no.”",
            "“Let us talk about what works for both of us.”",
          ],
        },
        { t: "p", text: "Pressure sounds like:" },
        {
          t: "list",
          items: [
            "“Real submissives do this.”",
            "“You are overthinking.”",
            "“You have to trust me.”",
            "“Negotiation ruins it.”",
            "“You will understand once you stop resisting.”",
            "“Do not ask other people about me.”",
          ],
        },
        { t: "p", text: "Experience does not entitle someone to your trust." },
      ],
    },
    {
      heading: "8. Let your first step be small",
      blocks: [
        { t: "p", text: "A first step can be:" },
        {
          t: "list",
          items: [
            "Reading an event description",
            "Attending a class",
            "Going to a social gathering",
            "Creating a private list of interests and limits",
            "Talking with your partner",
            "Booking a coaching session",
            "Leaving an event after twenty minutes",
            "Deciding you are not ready",
          ],
        },
        { t: "p", text: "Progress is not measured by intensity." },
      ],
    },
  ],
  cta: {
    headline: "Ready to enter the scene with more context and less guesswork?",
    body: "Private coaching can help you choose a first step, prepare for an event, understand an invitation, or think through a potential partner.",
    label: "Explore beginner coaching",
    to: "/coaching",
  },
  related: [
    {
      label: "Preparing for Your First Kink Event",
      to: "/guides/preparing-for-your-first-kink-event",
    },
    { label: "Kink Red Flags Beginners Should Know", to: "/guides/kink-red-flags-for-beginners" },
    { label: "Beginner BDSM Coaching", to: "/services/beginner-bdsm-coaching" },
  ],
};

export const guideNegotiateFirstScene: Guide = {
  slug: "how-to-negotiate-your-first-scene",
  path: "/guides/how-to-negotiate-your-first-scene",
  crumbLabel: "How to Negotiate Your First Scene",
  title: "How to Negotiate Your First Kink Scene",
  description:
    "A beginner guide to negotiating a first kink scene, including interests, boundaries, limits, health information, intensity, stop signals, and aftercare.",
  h1: "How to Negotiate Your First Kink Scene Without Feeling Awkward",
  datePublished: PUBLISHED,
  intro: [
    {
      t: "p",
      text: "A scene is a planned period of kink activity. Negotiation is the conversation that happens before it.",
    },
    {
      t: "p",
      text: "The goal is not to predict every second or eliminate every risk. The goal is to make sure everyone understands what is being proposed, what is not being proposed, how to communicate during it, and how either person can stop.",
    },
    { t: "p", text: "Negotiation can sound natural. It still needs to be clear." },
  ],
  sections: [
    {
      heading: "1. Start with what each person wants",
      blocks: [
        { t: "p", text: "Ask:" },
        {
          t: "list",
          items: [
            "What are you interested in doing?",
            "What sounds exciting about it?",
            "What role does each person want?",
            "Is this exploratory, playful, intense, sensual, structured, or something else?",
            "Is there a specific activity or feeling you are trying to create?",
          ],
        },
        {
          t: "p",
          text: "Do not assume two people mean the same thing by “rough,” “dominant,” “submissive,” “light,” or “intense.”",
        },
      ],
    },
    {
      heading: "2. Discuss boundaries and limits",
      blocks: [
        { t: "p", text: "Ask:" },
        {
          t: "list",
          items: [
            "What is off-limits?",
            "What are you uncertain about?",
            "Are there areas of the body that should not be touched?",
            "Are there words, roles, or emotional themes to avoid?",
            "Are there activities that require a separate conversation?",
            "Is anything a no today even if it might be interesting later?",
          ],
        },
        { t: "p", text: "A boundary does not require a persuasive explanation." },
      ],
    },
    {
      heading: "3. Share relevant health and access information",
      blocks: [
        {
          t: "p",
          text: "People should share information that materially affects the activity, such as:",
        },
        {
          t: "list",
          items: [
            "Injuries",
            "Mobility limitations",
            "Circulation concerns",
            "Allergies",
            "Medications that affect bleeding, balance, alertness, or pain",
            "Panic responses",
            "Sensory needs",
            "Pregnancy",
            "Relevant sexual-health considerations",
            "Anything that affects communication or stopping",
          ],
        },
        { t: "p", text: "This is not a request for a complete medical history." },
        {
          t: "p",
          text: "When an activity carries risks you do not understand, pause and learn before proceeding.",
        },
      ],
    },
    {
      heading: "4. Define intensity",
      blocks: [
        {
          t: "p",
          text: "Words such as light, medium, hard, rough, gentle, or painful are subjective.",
        },
        {
          t: "p",
          text: "Use examples, a gradual scale, or a plan to start low and increase only with clear feedback.",
        },
        {
          t: "p",
          text: "Do not use someone’s tolerance as a test of commitment, submission, toughness, or authenticity.",
        },
      ],
    },
    {
      heading: "5. Agree on ways to pause and stop",
      blocks: [
        { t: "p", text: "Discuss:" },
        {
          t: "list",
          items: [
            "A clear word for stopping",
            "A word or signal for slowing down or checking in",
            "Nonverbal signals if speech may be difficult",
            "What happens immediately after a stop signal",
            "Whether either person has reactions such as freezing, going quiet, or becoming unable to answer quickly",
          ],
        },
        { t: "p", text: "A person can stop for any reason." },
        { t: "p", text: "Consent can change even when the original negotiation was clear." },
      ],
    },
    {
      heading: "6. Discuss check-ins",
      blocks: [
        {
          t: "p",
          text: "Some people prefer verbal check-ins. Others prefer hand signals, rating scales, or observation combined with occasional questions.",
        },
        { t: "p", text: "Do not treat silence as reliable consent." },
        {
          t: "p",
          text: "A person appearing aroused, emotional, physically responsive, still, or compliant does not replace communication.",
        },
      ],
    },
    {
      heading: "7. Talk about aftercare",
      blocks: [
        {
          t: "p",
          text: "Aftercare means whatever support or transition people may want after the activity.",
        },
        { t: "p", text: "It might include:" },
        {
          t: "list",
          items: [
            "Water",
            "Food",
            "Warmth",
            "Quiet",
            "Physical closeness",
            "Space",
            "Reassurance",
            "Help cleaning up",
            "A ride home",
            "A message the next day",
            "No contact until a specified time",
          ],
        },
        { t: "p", text: "People may want different things. Ask rather than assuming." },
      ],
    },
    {
      heading: "8. Discuss what happens if something goes wrong",
      blocks: [
        { t: "p", text: "Ask:" },
        {
          t: "list",
          items: [
            "How will we respond to an injury?",
            "Is there a first-aid kit?",
            "Who can we contact?",
            "What information should be available in an emergency?",
            "How will we talk afterward if one person feels upset, confused, or hurt?",
            "What does accountability look like if a mistake happens?",
          ],
        },
        { t: "p", text: "Negotiation is not proof that nothing will go wrong." },
      ],
    },
    {
      heading: "9. Give everyone time to decide",
      blocks: [
        { t: "p", text: "A negotiation does not require an immediate yes." },
        {
          t: "p",
          text: "People can ask questions, change the plan, remove activities, postpone, or decline.",
        },
        { t: "p", text: "Urgency is not a sign of chemistry." },
      ],
    },
    {
      heading: "A simple beginner negotiation template",
      blocks: [
        {
          t: "list",
          ordered: true,
          items: [
            "What are we considering doing?",
            "What does each person want from it?",
            "What is off-limits?",
            "What health, access, or emotional information matters?",
            "How will we communicate intensity?",
            "How will we pause or stop?",
            "What aftercare does each person want?",
            "What would make us decide not to proceed?",
            "When will we check in afterward?",
          ],
        },
      ],
    },
  ],
  cta: {
    headline: "Want help preparing for a specific conversation or first scene?",
    label: "Book a private coaching session",
    to: "/book",
  },
  related: [
    { label: "Beginner BDSM Coaching", to: "/services/beginner-bdsm-coaching" },
    {
      label: "Preparing for Your First Kink Event",
      to: "/guides/preparing-for-your-first-kink-event",
    },
    { label: "Kink Red Flags Beginners Should Know", to: "/guides/kink-red-flags-for-beginners" },
  ],
};

export const guideRedFlags: Guide = {
  slug: "kink-red-flags-for-beginners",
  path: "/guides/kink-red-flags-for-beginners",
  crumbLabel: "Kink Red Flags",
  title: "Kink Red Flags Beginners Should Know",
  description:
    "Learn how to recognize pressure, boundary testing, unsafe claims, manipulation, and other concerning behavior when entering the kink scene.",
  h1: "Kink Red Flags Beginners Should Know",
  datePublished: PUBLISHED,
  intro: [
    {
      t: "p",
      text: "Experience, confidence, titles, and community status do not automatically make someone trustworthy.",
    },
    {
      t: "p",
      text: "A red flag is not always proof that someone is dangerous. It is information worth slowing down for.",
    },
    {
      t: "p",
      text: "Beginners are often told to trust their instincts. That advice is incomplete. Instinct becomes more useful when you also know what behavior deserves scrutiny.",
    },
  ],
  sections: [
    {
      heading: "They pressure you to move quickly",
      blocks: [
        {
          t: "p",
          text: "Urgency can make it harder to ask questions, seek outside opinions, or notice inconsistencies.",
        },
      ],
    },
    {
      heading: "They treat dominance as automatic authority",
      blocks: [
        {
          t: "p",
          text: "A dominant role does not create authority outside a relationship or scene you have agreed to.",
        },
      ],
    },
    {
      heading: "They test small boundaries",
      blocks: [
        {
          t: "p",
          text: "Someone who repeatedly pushes small limits may be checking whether your no has consequences.",
        },
      ],
    },
    {
      heading: "They refuse to discuss safety",
      blocks: [
        {
          t: "p",
          text: "“No risk, no fun” is not a substitute for understanding what can go wrong.",
        },
      ],
    },
    {
      heading: "They claim negotiation ruins spontaneity",
      blocks: [
        {
          t: "p",
          text: "Negotiation can be brief, natural, and flexible. Refusing it protects ambiguity, not spontaneity.",
        },
      ],
    },
    {
      heading: "They say real dominants or submissives behave one way",
      blocks: [
        { t: "p", text: "“Real” is often used to pressure people into proving themselves." },
      ],
    },
    {
      heading: "They discourage outside advice",
      blocks: [
        {
          t: "p",
          text: "A trustworthy person should not need you isolated from friends, community members, educators, or professionals.",
        },
      ],
    },
    {
      heading: "They use status to avoid questions",
      blocks: [
        {
          t: "p",
          text: "Popularity, experience, event leadership, and references are context. They are not immunity from accountability.",
        },
      ],
    },
    {
      heading: "They ignore privacy expectations",
      blocks: [
        {
          t: "p",
          text: "Sharing names, photos, messages, or personal details without permission is a serious concern.",
        },
      ],
    },
    {
      heading: "They treat safewords as weakness",
      blocks: [
        {
          t: "p",
          text: "Stopping is not failure. A person who punishes communication is not creating meaningful consent.",
        },
      ],
    },
    {
      heading: "Every concern becomes your fault",
      blocks: [
        {
          t: "p",
          text: "Accountability requires the ability to hear that an interaction caused harm or confusion without immediately blaming the other person.",
        },
      ],
    },
    {
      heading: "Incompatibility is not always misconduct",
      blocks: [
        { t: "p", text: "A person can be a poor fit without being abusive or unsafe." },
        {
          t: "p",
          text: "Different interests, communication styles, aftercare needs, relationship goals, or risk tolerances may simply mean you should not proceed together.",
        },
        { t: "p", text: "The goal is not to label everyone. It is to make a clearer decision." },
      ],
    },
  ],
  cta: {
    headline: "Unsure how to evaluate a person, invitation, or upcoming situation?",
    label: "Book a coaching session",
    to: "/book",
  },
  related: [
    { label: "How to Enter the Kink Scene", to: "/guides/how-to-enter-the-kink-scene" },
    { label: "How to Negotiate Your First Scene", to: "/guides/how-to-negotiate-your-first-scene" },
    {
      label: "Preparing for Your First Kink Event",
      to: "/guides/preparing-for-your-first-kink-event",
    },
  ],
};

export const allGuides: Guide[] = [
  guideEnterTheScene,
  guideFirstKinkEvent,
  guideNegotiateFirstScene,
  guideRedFlags,
];
