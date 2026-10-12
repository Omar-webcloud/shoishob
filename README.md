Below is a production-oriented PRD for Bangladesh Childhood Generator, designed around nostalgia, personalized identity, and viral sharing. It incorporates your export/download architecture, Next.js and localStorage constraints, and the Lush Forest visual identity.

[糖心——甜蜜心意的专属体验平台](https://images.openai.com/static-rsc-4/tEfY8SqAjfB-jYLAGDqPRs--XdoQKERvAW0cPcng4220EJXKlPxT5TCdF0h4ZsPyTjUuMxDyC78_ZcosZ8NjuZVpECxrgGHZev4Hkjd5clRmua6LfOsrLSeyMSy4HdgGYEiNaVHxt5rrihmMSzT3eTaxbKelZNuMLHjWbqN3tsY?purpose=inline)

[new-tangxin.com.cn](https://new-tangxin.com.cn/)

# Bangladesh Childhood Generator

Product Requirements Document · MVP · Version 1.0 · October 2026

# 1. Product overview

## 1.1 Product vision

Build a nostalgic, interactive web application that generates a personalized Bangladesh Childhood Identity Card based on a user's childhood memories, including television shows, school snacks, toys, games, school life, technology, and cultural experiences.

Users answer a short series of questions and receive a beautifully designed, personalized result that identifies their childhood archetype, generation, defining memories, and nostalgia profile. They can download the result as a high-quality image and share it with friends.

The experience should feel like discovering an old childhood memory box, not filling out a generic online quiz.

## 1.2 Core value proposition

“Your childhood was a whole era. Let's find yours.”

Bangla alternative:

“আপনার শৈশবটা কোন যুগের ছিল?”

The product transforms personal memories into a shareable identity. Users should feel curious about their own result and interested in comparing it with friends.

## 1.3 Product goals

- Generate a personalized result in approximately 2–3 minutes.
- Make the first question accessible immediately, without registration.
- Create a visually compelling result card designed for social sharing.
- Support PNG and JPG downloads across desktop and mobile browsers.
- Encourage a natural viral loop: create a result, share it, invite friends, and compare childhoods.
- Work entirely without a database, authentication, or mandatory backend persistence.

## 1.4 Target audience

| Audience                              | Primary motivation                                               |
| ------------------------------------- | ---------------------------------------------------------------- |
| Gen Z in Bangladesh                   | Compare childhood experiences and share entertaining results     |
| Millennials                           | Revisit school memories, television, games, and snacks           |
| Bangladeshi diaspora                  | Reconnect with familiar cultural memories                        |
| Friend groups and university students | Compare generations and discover shared or different experiences |
| Bangla nostalgia communities          | Discuss regional and cultural childhood differences              |

The product should be enjoyable across age groups without assuming that every Bangladeshi childhood was identical.

# 2. Core user journey

Landing page

A compelling nostalgia-led headline and a prominent “Discover My Childhood” button.

Interactive memory quiz

Answer 10–12 questions about childhood experiences, memories, and preferences.

Personalized childhood reveal

Reveal a childhood archetype, a generation estimate, and a collection of matching memories.

Generate identity card

Render a polished social card in PNG or JPG, with preview and download controls.

Share and challenge friends

Share to Facebook, WhatsApp, or Instagram Stories, or save the image and upload it manually.

# 3. Functional requirements

## 3.1 Landing page

The landing page must communicate the concept within the first viewport.

Required elements:

- Distinctive brand mark and product name.
- Headline: “Your childhood was a whole era.”
- Supporting copy in English, with optional Bangla language switching.
- Primary CTA: “Discover My Childhood.”
- A sample identity card preview.
- A brief indication of the quiz duration.
- A visible privacy statement: “No account. No sign-up. Your answers stay on your device.”
- Responsive layout for mobile, tablet, and desktop.

The sample result should be clearly labeled as an example rather than a real personalized result.

## 3.2 Interactive childhood quiz

The quiz should contain 10–12 questions, grouped into short, easy-to-understand interactions.

Question categories:

| Category          | Example content                                               |
| ----------------- | ------------------------------------------------------------- |
| School snacks     | Jhal muri, ice cream sticks, fuchka, homemade tiffin          |
| Television        | Cartoon Network, Doraemon, Pokémon, local television programs |
| Games             | Cricket in the street, badminton, carrom, video games         |
| Toys and hobbies  | Marbles, spinning tops, stickers, toy cars                    |
| School life       | Tiffin breaks, handwritten notes, school buses, coaching      |
| Technology        | Feature phones, early internet cafés, computer games          |
| Cultural memories | Eid salami, neighborhood play, family television time         |
| Regional memories | Local snacks, dialects, festivals, and childhood traditions   |

These are candidate examples, not assumptions that all users experienced them.

### Interaction requirements

- Display one question at a time.
- Use visual answer cards with short labels.
- Provide clear selected, hover, and focus states.
- Show quiz progress, such as “Question 4 of 12.”
- Support previous and next navigation.
- Allow users to change previous answers.
- Save progress in localStorage.
- Provide a restart option.
- Make all questions optional unless required for a meaningful result.
- Avoid collecting names, exact birth dates, locations, or other unnecessary personal information.

## 3.3 Personalized result engine

The result engine must run deterministically on the client. The same answers should produce the same result.

It must generate:

1. Childhood archetype: A playful, memorable personality label.
2. Era estimate: A broad childhood era inferred from the user's answers, clearly presented as an estimate rather than an authoritative age determination.
3. Memory profile: The user's strongest childhood themes.
4. Signature memory: A short, personalized description derived from their selections.
5. Nostalgia score: A clearly explained, playful score based on predefined scoring rules.
6. Shareable summary: A concise headline and result that fit within the identity card.

Possible archetypes:

- The Street-Game Legend
- The Cartoon-Era Kid
- The Tiffin-Time Champion
- The Early Internet Explorer
- The Neighborhood Adventurer
- The Nostalgic All-Rounder

Archetypes should be assigned using a transparent scoring model, not random selection. Questions and scoring weights must be configured in a local content file.

The result should not claim that a user's answers definitively establish their age, personality, or childhood circumstances.

## 3.4 Result page

The result page must contain:

- A distinctive result headline.
- The user's archetype.
- A small collection of matching memories.
- The estimated era, where sufficient evidence exists.
- The nostalgia score.
- A high-quality identity-card preview.
- Download PNG and Download JPG actions.
- Share actions for WhatsApp and Facebook.
- An Instagram Story workflow.
- A retake quiz action.
- A “Challenge your friends” CTA.

The card must remain visually appealing without requiring users to enter their names or upload photographs.

# 4. Viral sharing and image generation

This is a core feature, not an optional enhancement.

## 4.1 Export specifications

| Property                  | Requirement                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| PNG format                | Lossless image output                                                                     |
| JPG format                | JPEG quality of 95%                                                                       |
| Portrait export           | 1080 × 1350 px                                                                            |
| Landscape export          | 1200 × 750 px                                                                             |
| High-resolution rendering | Prefer `pixelRatio: 2`, with memory-safe fallback                                         |
| Fonts                     | Wait for required fonts to load before rendering                                          |
| Preview                   | Show the generated image before or alongside download controls                            |
| Filename                  | `bangladesh-childhood-[archetype].[png/jpg]`                                              |
| Download confirmation     | Show success only after the download is successfully initiated or the browser confirms it |
| Failure handling          | Provide a useful fallback instead of silently failing                                     |

The portrait format should be the default because it works well for feed posts and can be adapted for Instagram Stories. A separate 1080 × 1920 Story export may be added as a later enhancement.

## 4.2 Browser-adaptive download architecture

The application must use a progressive-enhancement strategy. It must not assume that every browser supports the `download` attribute, that every in-app browser permits blob URLs, or that navigation to an attachment will always trigger a native save dialog.

Tier 1

Client-side image rendering

Use `html-to-image` or an equivalent maintained library to render the card, convert it to a Blob, and initiate a download using an anchor with the `download` attribute. Prefer Blob URLs over large base64 data URLs.

Tier 2

Web Share API

When available, use `navigator.share()` with a generated image `File` to let supported mobile browsers open the native share sheet. Check `navigator.canShare({ files })` before attempting file sharing.

Tier 3

Save-image fallback

If direct download fails, display the generated image in a dedicated save screen with clear instructions to press and hold on mobile or right-click on desktop.

Tier 4

Optional server-assisted export

If later testing demonstrates a genuine need, add a Next.js route that returns an image with `Content-Disposition: attachment`. Use a validated card payload or short-lived server-side cache rather than trusting arbitrary client-provided binary data.

### Platform-specific behavior

| Environment                            | Required behavior                                                                   |
| -------------------------------------- | ----------------------------------------------------------------------------------- |
| Chrome, Edge, Brave                    | Client-side export and download                                                     |
| Firefox                                | Client-side export with native download settings respected                          |
| Safari on macOS                        | Font-ready rendering and download fallback                                          |
| Safari on iOS                          | Support download and native sharing where available                                 |
| Facebook and Messenger in-app browsers | Test download behavior; provide image preview and open-in-external-browser guidance |
| Instagram in-app browser               | Provide a save-image screen and manual Story-sharing instructions                   |
| Android WebViews                       | Attempt supported download mechanisms, with a manual fallback                       |
| Low-memory mobile devices              | Retry rendering at a lower pixel ratio if needed                                    |

Important technical limitation: JavaScript cannot reliably force every in-app browser to save a file or launch an external browser. User-gesture restrictions, WebView behavior, operating-system settings, and browser policies vary. Therefore, the acceptance criterion is reliable access to the generated image and a usable recovery path, not a guarantee of automatic downloads on every device.

## 4.3 Image rendering implementation requirements

The implementation must:

- Await `document.fonts.ready`.
- Ensure the result card is fully rendered before capture.
- Embed local fonts and assets where practical.
- Avoid cross-origin image tainting by using local assets or correctly configured CORS.
- Retry at a lower resolution if a high-resolution canvas fails.
- Validate that the generated Blob is non-empty.
- Revoke temporary object URLs after use, without prematurely interrupting an active save workflow.
- Handle cancellation separately from genuine export errors.
- Keep all download initiation actions associated with a real user gesture when browser policies require it.
- Avoid converting large images into base64 strings unnecessarily.

A two-pass Safari rendering workaround may be tested if real-device testing demonstrates a rendering issue. It should not be mandatory for every browser without evidence that it is needed.

## 4.4 Social sharing

### WhatsApp

Use the WhatsApp share URL with a concise message and the application's public URL. The app should not claim that the generated image itself will be attached automatically; the user may need to select the image separately.

### Facebook

Provide a Facebook sharing action using the public application URL. If a dedicated share page is introduced, ensure its metadata includes an appropriate Open Graph title, description, and preview image.

### Instagram Stories

Instagram does not provide a general-purpose web URL that automatically publishes an arbitrary generated image to every user's Story.

The required browser experience is:

1. Generate the identity card.
2. Let the user save the image or invoke the native share sheet where supported.
3. Explain how to open Instagram and add the image to a Story.
4. Provide a clear manual fallback when direct Story sharing is unavailable.

### Copy link

Provide a copy-link action for the application homepage or a supported share route. A copied homepage link must not be represented as a persistent link to the user's exact result unless the result is encoded or stored in a supported format.

## 4.5 Shareable result URLs

For the initial release, result sharing can use a compact, versioned URL-encoded payload if it remains reasonably small and contains no sensitive information.

Example structure:

`/share?v=1&data=[encoded-result]`

Requirements:

- Validate and sanitize every field.
- Set strict payload-size limits.
- Do not include personally identifying information.
- Support a graceful error screen for malformed or unsupported payloads.
- Treat URL data as user-controlled and untrusted.
- Do not imply that a URL-encoded result is private or tamper-proof.
- Do not expose large raw image data in query parameters.

If reliable social preview images or stable, short links are required, introduce a minimal backend or hosting-compatible image-generation route in a later phase. A static client-only application cannot guarantee server-generated Open Graph previews for arbitrary client-side results.

# 5. Local data and persistence architecture

## 5.1 Storage policy

Use localStorage for:

- Quiz answers.
- Quiz progress.
- Result version and archetype.
- User-selected language.
- Optional preferences, such as the preferred export format.

Do not store unnecessary personal information or generated image binaries in localStorage.

### Suggested storage keys

| Key                   | Purpose                            |
| --------------------- | ---------------------------------- |
| `bdcg_answers_v1`     | Current quiz answers               |
| `bdcg_result_v1`      | Derived result data                |
| `bdcg_preferences_v1` | Language and interface preferences |
| `bdcg_schema_version` | Storage migration tracking         |

Storage access must be wrapped in error handling to accommodate disabled storage, private browsing restrictions, and quota failures.

## 5.2 No database and no authentication

The MVP must not require:

- User accounts.
- Login or registration.
- A database.
- Server-side user profiles.
- Persistent server storage of quiz answers.

The application should work even when localStorage is unavailable, using in-memory state for the active session.

A static client-side architecture is preferred unless a demonstrated sharing or export requirement justifies a server route.

# 6. Visual design system

The supplied Lush Forest palette is the mandatory visual foundation.

Forest green

`#2E6F40`

Primary brand, key actions, selected states

Mint

`#CFF FDC`

Soft surfaces and visual accents

Leaf green

`#68BA7F`

Progress, highlights, secondary actions

Deep forest

`#253D2C`

Headings, dark surfaces, contrast

The mint hex code in the supplied image is `#CFF FDC` only if interpreted literally with a space, which is not a valid CSS hex color. The intended value should be confirmed from the original design asset; based on the visible label, the likely intended value is `#CFF FDC` without a valid direct conversion. Do not use an invalid color token in production. The other three palette values are valid.

## 6.1 Visual direction

Design keywords: editorial nostalgia, minimalist, tactile, warm, playful, understated, modern.

The UI should use claymorphism selectively rather than turning every component into a floating pill.

- Soft, rounded cards with restrained shadows.
- Subtle inset surfaces for quiz choices.
- Large typography and generous whitespace.
- Illustrated childhood motifs: marbles, notebooks, television sets, school bags, and snack wrappers.
- Small decorative details inspired by paper collectibles and old school stationery.
- Minimal, deliberate animation.
- High contrast and accessible focus states.

Avoid generic SaaS gradients, excessive glassmorphism, excessive shadows, oversized floating blobs, and emoji-only illustrations.

## 6.2 Component design

| Component          | Design requirement                                  |
| ------------------ | --------------------------------------------------- |
| Primary button     | Forest green, high contrast, clear pressed state    |
| Secondary button   | Mint or neutral surface with forest-green text      |
| Quiz option        | Rounded tactile card with clear selected state      |
| Progress indicator | Slim leaf-green progress bar                        |
| Result card        | Editorial layout with layered memory motifs         |
| Download controls  | Clearly labeled PNG/JPG actions                     |
| Modal              | Restrained overlay, accessible focus management     |
| Toast              | Brief status feedback without blocking interactions |

## 6.3 Responsive behavior

- Mobile-first design.
- Single-column quiz layout on narrow screens.
- Two-column answer cards where space permits.
- Result card preview scales responsively without distorting its export proportions.
- Touch targets should be at least 44 × 44 CSS pixels.
- The export image must use fixed output dimensions independent of viewport size.

# 7. Technical architecture

## Recommended stack

| Layer        | Technology                                    |
| ------------ | --------------------------------------------- |
| Framework    | Next.js App Router                            |
| Language     | TypeScript                                    |
| Styling      | Tailwind CSS                                  |
| State        | React state or a lightweight store            |
| Persistence  | Browser localStorage                          |
| Image export | `html-to-image` or equivalent                 |
| Icons        | Lucide                                        |
| Fonts        | Locally bundled fonts where licensing permits |
| Deployment   | Vercel                                        |
| Backend      | None required for the MVP                     |

### Suggested project structure

```
app/
  layout.tsx
  page.tsx
  quiz/page.tsx
  result/page.tsx
  share/page.tsx
  globals.css

components/
  landing/
    hero.tsx
    sample-card.tsx
  quiz/
    quiz-shell.tsx
    question-card.tsx
    quiz-progress.tsx
  result/
    result-card.tsx
    result-summary.tsx
    share-actions.tsx
    download-controls.tsx
    save-image-dialog.tsx

lib/
  quiz-data.ts
  scoring.ts
  result-generator.ts
  storage.ts
  export-image.ts
  share.ts
  validation.ts

types/
  quiz.ts
  result.ts

public/
  illustrations/
  fonts/
```

The `/share` page is optional in the first release if it delays the core experience. If implemented, it must validate the result payload and provide safe fallback behavior.

# 8. Accessibility, performance, and privacy

## Accessibility

- WCAG 2.2 AA as the target.
- Full keyboard navigation.
- Screen-reader labels for quiz options and progress.
- Reduced-motion support.
- Accessible contrast for text and interactive controls.
- No information conveyed exclusively through color.

## Performance

- Prioritize a fast initial page load on mobile connections.
- Avoid loading all illustrations at once.
- Use optimized local assets.
- Lazy-load non-critical visuals.
- Prevent unnecessary re-rendering of the export card.
- Ensure image export does not freeze the interface for an extended period.
- Provide a loading indicator during image generation.

## Privacy

- No login or tracking required to generate a result.
- Quiz answers remain in browser storage unless explicitly included in a share URL.
- Provide a “Clear my data” action.
- Disclose that anyone with a shared result URL may be able to read the encoded result.
- Do not embed personal information in filenames or share payloads.
- If analytics are introduced, collect only what is necessary and disclose their use.

# 9. Error handling and recovery

| Scenario                          | Expected behavior                                                        |
| --------------------------------- | ------------------------------------------------------------------------ |
| Font loading failure              | Use a system-font fallback                                               |
| Image export fails                | Show an actionable error and retry option                                |
| High-resolution rendering fails   | Retry at a lower pixel ratio                                             |
| Browser blocks automatic download | Display the save-image screen                                            |
| Web Share API unavailable         | Show platform-specific sharing instructions                              |
| Clipboard permission denied       | Display the URL for manual copying                                       |
| Invalid share payload             | Show a friendly error and return-home CTA                                |
| localStorage unavailable          | Continue using in-memory state                                           |
| Incomplete quiz                   | Resume where possible or allow result generation from sufficient answers |
| User cancels sharing              | Return to the result page without an error                               |
| Page refresh                      | Restore answers and progress when storage is available                   |

# 10. MVP acceptance criteria

The release is considered ready when all of the following are met:

- The landing page explains the experience without requiring scrolling.
- The quiz supports forward/backward navigation and answer changes.
- The result engine produces deterministic results.
- Quiz progress survives a refresh when localStorage is available.
- The result card exports to PNG and JPG at the specified dimensions.
- Image exports use the correct font, colors, and layout.
- Chrome, Firefox, Edge, desktop Safari, and iOS Safari have been tested.
- Facebook, Instagram, and Messenger in-app browser flows have been tested on representative devices.
- Download failures have a usable manual save fallback.
- WhatsApp and Facebook sharing actions work as intended.
- Instagram Story sharing provides an accurate save-and-share workflow.
- No database or authentication is required.
- The experience works without localStorage, using in-memory state.
- All primary interactions are keyboard accessible.
- Mobile layouts have no horizontal overflow.
- The “Clear my data” action removes the application's stored answers and preferences.
- No success message claims a file was saved unless that outcome is actually known.

# 11. Success metrics

The first release should validate the core loop rather than chase vanity metrics.

| Metric                                 | Initial target                               |
| -------------------------------------- | -------------------------------------------- |
| Landing-to-quiz conversion             | 60% or higher                                |
| Quiz completion rate                   | 65% or higher                                |
| Result-to-image export initiation      | 30% or higher                                |
| Successful image generation            | 98% or higher on supported test environments |
| Share-action usage                     | 20% or higher of completed quizzes           |
| Invitee-to-quiz conversion             | Measure and establish baseline               |
| New quiz creators per existing creator | Track as the primary viral coefficient input |

These are proposed targets, not existing performance data or guaranteed outcomes. The team should revise them after collecting an initial sample of real usage.

# 12. Development roadmap

1. Phase 1 — Product foundation

   Implement the design system, landing page, question data, quiz interactions, local persistence, and deterministic scoring.
2. Phase 2 — Result experience

   Implement archetypes, the personalized result page, the card layout, and the responsive preview.
3. Phase 3 — Image export and sharing

   Implement PNG/JPG rendering, browser-adaptive fallbacks, copy link, WhatsApp/Facebook sharing, and Instagram Story instructions.
4. Phase 4 — Testing and launch

   Test mobile browsers and in-app WebViews, verify accessibility, optimize performance, and launch with a small group of users.

## Final product decision

The MVP should prioritize one memorable experience: answer a few questions, rediscover your childhood, and get an identity card worth sharing.

Do not add accounts, leaderboards requiring a database, AI-generated narratives, or complex social feeds in the first release. First prove that people enjoy their results and voluntarily share them.

The defining differentiator should be the combination of Bangladeshi cultural specificity, a polished nostalgia-driven visual identity, a deterministic personalized result, and reliable image export.


The app will be named শৈশব (Shoishob), with Bangla as the primary language throughout the interface, quiz, results, buttons, and sharing experience.

Research into Bangladeshi childhood nostalgia points to several particularly rich themes: BTV cartoons and dramas, school tiffin, neighborhood games, the arrival of satellite television, and the transition from analogue childhood to mobile phones and the internet.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://tbsgraduates.net\&sz=32)

Graduates

+4



The key design decision is to make Shoishob feel like opening an old memory album—not a generic personality quiz.

# Updated PRD: শৈশব (Shoishob)

[Nostalgic Childhood Memories of the 90s in Bangladesh by Jahid Hasan | Logo, Brand & UI/UX Designer on Dribbble](https://images.openai.com/static-rsc-4/jyMdIu6XyFu6g2hCLsrYAbz5tf_MfT3B6UkM3DCZmqP8NIu5YtIswe2B3FTt5CeHT1pJHwl2IVhflAq_lG7F_531-8Cjy2UGhQkI9x3_zDqSX6ib0PwMAkDCZfnqap2MlEVPJKNZcY6IGbkjIgbFzm4JvNEjuQRAH-4CZ7VfqhQ?purpose=inline)

[dribbble.com](https://dribbble.com/shots/26527209-Nostalgic-Childhood-Memories-of-the-90s-in-Bangladesh)

# শৈশব

তোমার ছোটবেলার গল্পটা কেমন ছিল?

বাংলাদেশের শৈশব, স্মৃতি আর নস্টালজিয়ার একটি ইন্টার‍্যাক্টিভ অভিজ্ঞতা।

## ১. পণ্যের মূল ধারণা

শৈশব এমন একটি ওয়েব অ্যাপ, যেখানে ব্যবহারকারী ছোটবেলার স্মৃতি নিয়ে কিছু প্রশ্নের উত্তর দিয়ে নিজের শৈশবের একটি ব্যক্তিগত পরিচয় তৈরি করবে।

অ্যাপটি শেষে জানাবে ব্যবহারকারী কোন ধরনের শৈশবের প্রতিনিধি, তার কোন স্মৃতিগুলো সবচেয়ে বেশি মিলে যায় এবং কোন সময়ের শৈশবের সঙ্গে তার অভিজ্ঞতার মিল রয়েছে।

- সম্পূর্ণ বাংলা ইন্টারফেস।
- কোনো অ্যাকাউন্ট বা সাইন-আপ নয়।
- ১০–১২টি ছোট প্রশ্ন।
- ব্যক্তিগত শৈশব-প্রোফাইল ও নস্টালজিয়া কার্ড।
- PNG ও JPG ডাউনলোড।
- Facebook, WhatsApp ও Instagram Story-তে শেয়ার করার সুবিধা।
- Next.js, TypeScript, Tailwind CSS ও localStorage।

## ২. বাংলাদেশের শৈশবের স্মৃতি: কনটেন্ট রিসার্চ

নিচের বিষয়গুলো গবেষণায় পাওয়া স্মৃতির থিম এবং অ্যাপের জন্য প্রস্তাবিত কনটেন্ট। এগুলোকে সব বাংলাদেশির অভিন্ন অভিজ্ঞতা হিসেবে দেখানো যাবে না।

[UNICEF (@UNICEF) on X](https://images.openai.com/static-rsc-4/JW6YaVr5YTyHSDu1DV9wGpIwubvKMys_wMThotfDgQ79cqzN7K-m2iJFwdB3HzST2bzfLGCzpEeJVXS5Nh1JA4esAdGaJP6I9WGAu-Shn1UFPAtNmCyaT2DmZtT7O3zDJ_NjKunxqtxMp6xg0VmAxKQQcm-DWKlPI8Fi0g0-pZM?purpose=inline)

১. স্কুলের টিফিন ও ছোটবেলার খাবার

- ঝালমুড়ি, চানাচুর, ফুচকা
- আইসক্রিম, কুলফি, বরফের গোলা
- টিফিন বক্সের পরোটা, ডিম, পাউরুটি
- স্কুলের সামনে বিক্রি হওয়া ছোট ছোট খাবার

সূত্র: [The Daily Star — Growing Up the '90s vs the 2000s](https://www.thedailystar.net/lifestyle/cover-story/growing-the-90s-vs-the-2000s-3697)।

[‌‘সিসিমপুর’-এর নতুন মৌসুম শুরু](https://images.openai.com/static-rsc-4/kHqUtheOL-5EvbWUJXTqJMHPC_s5ijVj0Lo2GXGatlZJfsEXoT-q0lPvICm6PBpQBCTQv341_Zpg9t7w_iTA1t--3OjT7_tF2sN-rrVR7vnasnbvhBDTKQyjkL_5ih9JyAR-Tw57Kbh3ZSNocGQREZH1_xQsxdAsPbuBPikI6VQ?purpose=inline)

২. কার্টুন ও টেলিভিশন

- মীনা, সিসিমপুর, ইকরি মিকরি
- টম অ্যান্ড জেরি, ডোরেমন, শিনচ্যান
- আলিফ লায়লা ও শুক্রবারের টিভি অনুষ্ঠান
- কার্টুনের সময় হওয়ার অপেক্ষা, বিজ্ঞাপনের বিরতি

সূত্র: [UNICEF Bangladesh — Meena](https://www.unicef.org/bangladesh/en/meena-and-unicef) এবং [The Business Standard — Forgotten Cartoons](https://tbsgraduates.net/writeup/the-forgotten-cartoons-of-bangladeshs-golden-childhood/)।

[মাটির খেলা থেকে স্ক্রিন প্রজন্ম: গল্প হয়ে যাচ্ছে গ্রামীণ খেলাধুলা](https://images.openai.com/static-rsc-4/VsuLprr8l9QzZD_XLRiHNx_hv4Jo3v0tH72bbK-OLKUvCsuJTwUCTDa8mnwZWX4mVjwdNgpKv5O5sr_SGdcq7f7lqIDnlYMFuxCNtfNXiSZmoSHfOVL_EOTx75aWEb3WMtQ6m8ZIfXIllgbnYHppf3-zOqKJ0ruyqgPUlJ_oAv8?purpose=inline)

৩. বিকেলের খেলাধুলা

- মার্বেল, লাটিম, ঘুড়ি ও ডাংগুলি
- গোল্লাছুট, দাঁড়িয়াবান্ধা, লুকোচুরি
- গলির ক্রিকেট ও বৃষ্টিতে ফুটবল
- বন্ধুদের সঙ্গে মাঠে বা ছাদে খেলা

সূত্র: [The Daily Star — Playtimes of the Past](https://www.thedailystar.net/shout/cover-story/playtimes-the-past-1347214)।

[Los tres aparatos tecnológicos con mayor probabilidad de desaparecer en el futuro, según la inteligencia artificial - Semana](https://images.openai.com/static-rsc-4/JrVSwmyUk69HE3xaxMZzej2iJk50fe4Y6zc4dfNOAOGWAlIJ9ZRwrKojwvNqMl29ibPTzecost-xl6e1I5sdr6T1ouP7yDXrw06LSOVkOK6sLw7uUUnyDqC6-HhIEO-L_P_ogJvEJi9iwQHqlz5Zy7jbwx4k246G921J_VuSqH4?purpose=inline)

৪. প্রযুক্তির বদলে যাওয়া সময়

- বক্স টিভি, ক্যাসেট ও সিডি
- কম্পিউটার গেম ও ইন্টারনেট ক্যাফে
- ফিচার ফোন, রিংটোন ও MP3 প্লেয়ার
- স্মার্টফোন আসার আগের জীবন

সূত্র: [The Business Standard — 2000s: The Last Analogue Childhood](https://www.tbsnews.net/features/2000s-last-analogue-childhood-1512341)।

[The Future of Governance](https://images.openai.com/static-rsc-4/v46U90zuxqjNysZu2FUHzJCPpiAl0ekls0xSqNayVjOps4V-Ql1bmWWY_8A5X-_pJCjJ66nAqciF0aRF4ZBhixLitvKlaCpe-H32jlHgNfs4XXjae1fLgfH4mGsjTiSdZdXVx33YjZwrw7bqqsc5rCj4LVNhR-auPLzJBfFZUFk?purpose=inline)

৫. স্কুলজীবন ও পারিবারিক স্মৃতি

- স্কুলের ঘণ্টা, টিফিনের বিরতি, পরীক্ষার ফল
- নতুন বইয়ের গন্ধ ও ঈদের ছুটি
- লোডশেডিংয়ে বন্ধুদের সঙ্গে আড্ডা
- শীতের সকাল, গ্রামের বাড়ি ও ছুটির দিন

কমিউনিটি আলোচনায় উঠে আসা স্মৃতির উদাহরণ: [r/bangladesh — Childhood nostalgia](https://www.reddit.com/r/bangladesh/comments/18e4l36)।

## ৩. প্রশ্ন ও উত্তর ডিজাইন

প্রশ্নগুলো যেন পরীক্ষার মতো না লাগে। প্রতিটি প্রশ্নে ছোট, পরিচিত উত্তর থাকবে এবং ব্যবহারকারী ছবি বা ইলাস্ট্রেশনসহ অপশন বেছে নিতে পারবে।

উদাহরণ:

প্রশ্ন ৩ / ১২

২৫%

# স্কুল থেকে ফিরে তোমার প্রথম কাজ কী ছিল?

📺টিভিতে কার্টুন দেখা

🏏বন্ধুদের সঙ্গে খেলতে যাওয়া

🍪টিফিন বা নাশতা খাওয়া

📚পড়তে বসা

এটি প্রশ্নের UI নমুনা, সম্পূর্ণ কুইজ নয়।

প্রস্তাবিত প্রশ্নের বিষয়:

1. স্কুল থেকে ফিরে কী করতে ভালো লাগত?
2. কোন কার্টুন বা অনুষ্ঠান দেখার জন্য অপেক্ষা করতে?
3. টিফিনের কোন খাবারটি সবচেয়ে প্রিয় ছিল?
4. বিকেল মানেই তোমার কাছে কী?
5. কোন খেলাটি সবচেয়ে বেশি খেলেছ?
6. ছোটবেলায় কোন প্রযুক্তি ব্যবহার করতে?
7. স্কুলের কোন স্মৃতিটি সবচেয়ে পরিচিত?
8. ছুটির দিন কীভাবে কাটাতে?
9. কোন জিনিসটি দেখলে এখনো ছোটবেলার কথা মনে পড়ে?
10. কোন সময়ের স্মৃতির সঙ্গে সবচেয়ে বেশি মিল খুঁজে পাও?
11. তোমার শৈশব বেশি কেটেছে শহরে, গ্রামে, নাকি দুটোতেই?
12. কোন স্মৃতিটি তুমি আবার ফিরে পেতে চাইবে?

প্রশ্ন ১০–১২ ঐচ্ছিক হতে পারে। ব্যবহারকারীর উত্তর অনুযায়ী প্রোফাইল তৈরি হবে, কিন্তু জন্মসাল বা বয়সের ভিত্তিতে নিশ্চিত প্রজন্ম নির্ধারণ করা হবে না।

## ৪. ফলাফল: ব্যক্তিগত শৈশব-পরিচয়

সম্ভাব্য ফলাফল:

[Local Kids Playing Cricket - ICC World Twenty20 Bangladesh 2014](https://images.openai.com/static-rsc-4/hwFXqEKIybUiEvlQml3aFI-q3IECfW2tqaIxO7tdgt5sPN4tUgQybKdvWcbkLcLOkPyrQC_Sh2Q3eZ9OEDdEr5N9AbUfdb6vJ2TNimMatrokCicccblh61GleTJGK0iRLpob0cKoipeFWkKC600-0vqb0MNfmOSQkvEbbPW6m8UaOj2tjiHNEppmyD45lm40?purpose=inline)

## গলির কিংবদন্তি

তোমার শৈশব মানেই বিকেলের খেলা, বন্ধু আর মাঠে কাটানো অফুরন্ত সময়।

[Nostalgic 2000s: A Bangladeshi Boy's Cartoon Adventure](https://images.openai.com/static-rsc-4/d6OT0iq_FjpiuqJbV7DbrOI3lPqnidu_VCvhiZJwhqhAXP_QeCu2Bg0ngo81_IdA2ty0nCQMaz6g0GGPmc1lmoARkJAGphGXvD6Y7cTCc-5js3FQJjSMMMEMZgjocEbos5fgbrIOGavKCXcQw5lT33ydkzbgDi551i9Xsl0Q6Zk?purpose=inline)

## কার্টুনের রাজা

প্রিয় কার্টুনের সময়সূচি তোমার মুখস্থ ছিল, আর একটি পর্বও মিস করতে চাইতে না।

[Free Stock Photos, PNGs, Templates & Mockups | rawpixel](https://images.openai.com/static-rsc-4/TduQOo4YYWvmyLqhTv3uNKgsVuTeZSejV5s5Uaudf14kqrsAbh2C1mJb32RYypMeIEGWaPzNbl0jUH4PuJGGUU_R04kjM5aVL50wEDQxePS3lsYpSNZ5gMy6ky2Hm9H5Iibpoe646X2lgu98l8S-zlkpWButAeB0YluxQt38lBY?purpose=inline)

## টিফিনের বস

বন্ধুদের সঙ্গে টিফিন ভাগাভাগি আর স্কুলের ছোট ছোট মুহূর্তই তোমার গল্প।

[Pierwszy Komputer  moment, który zmienił wszystko  | TuneFusion (Windows XP vibe) - CDA](https://images.openai.com/static-rsc-4/xrLdXSpJXm5lgVCGPd3K_dbAjS-q-Zb86OkvP7FAQVzvvCaw9arEu0Xkgk2TPnVzH1iAuEjKYWQlm8Dnt1vsYomusLRJHzPukwtEGU6Avwx6AlwbD-sovVlpcKn9n4IkTWhzj8ZLInjogD_h5Q_AKSnHIcwNGBgwANimHaYNITI?purpose=inline)

## ডিজিটাল অগ্রদূত

কম্পিউটার গেম, ক্যাসেট, সিডি আর নতুন প্রযুক্তির বিস্ময়ে তোমার শৈশব কেটেছে।

এগুলো নমুনা আর্কিটাইপ। চূড়ান্ত ফলাফল নির্ধারিত হবে প্রশ্নের উত্তর ও স্কোরিং নিয়ম অনুযায়ী।

## ৫. শেয়ারযোগ্য কার্ড

আমার শৈশব · SHOISHOB

# আমি ছিলাম গলির কিংবদন্তি!

[Local Kids Playing Cricket - ICC World Twenty20 Bangladesh 2014](https://images.openai.com/static-rsc-4/TErfLVxan0BeWITY0rzb9sl34NOJZ7Kh5xbW8i_lU7T4BNgDHjXkj5_bgL8OkFHvBV0KFZFXAcT1JNgaZKuNNCTnsMOktPRjHwxJq3UO-7HUVwgDWdl-B5QSIEmiSDUv5NnOdGqGviUdPn9NCSe2-G8o2f-MEbpu6pFs1qHTZ6a29pbrE6zFNsHZEouGs-dA?purpose=inline)

বিকেলের খেলা, বন্ধুদের ডাক আর সূর্য ডোবার আগ পর্যন্ত বাড়ি না ফেরা—এই ছিল আমার শৈশব।

আমার স্মৃতির ধরন

### নস্টালজিক অ্যাডভেঞ্চারার

তোমার শৈশবটা কেমন ছিল? · Shoishob

কার্ডের চূড়ান্ত সংস্করণে ব্যবহারকারীর নির্বাচিত স্মৃতি, আর্কিটাইপ এবং ব্যক্তিগত ফলাফল দেখানো হবে। নমুনা কার্ডের লেখা সব ব্যবহারকারীর জন্য এক হবে না।

## ৬. ব্র্যান্ড ও ডিজাইন

তোমার দেওয়া Lush Forest প্যালেট ব্যবহার করব:

| রঙ         | ব্যবহার                                                    |
| ---------- | ---------------------------------------------------------- |
| `#2E6F40`  | প্রাইমারি বাটন ও ব্র্যান্ড                                 |
| `#68BA7F`  | প্রগ্রেস বার ও হাইলাইট                                     |
| `#253D2C`  | গাঢ় ব্যাকগ্রাউন্ড ও হেডিং                                 |
| `#CFFFD6`  | প্রস্তাবিত মিন্ট সারফেস; মূল ছবির হেক্স কোড যাচাই করতে হবে |
| অফ-হোয়াইট | মূল পৃষ্ঠের ব্যাকগ্রাউন্ড                                  |

ডিজাইন হবে মিনিমাল, নরম ক্লেমরফিজম, কাগজের টেক্সচার, পুরোনো খাতার অনুভূতি এবং হাতে আঁকা স্মৃতির ইলাস্ট্রেশন দিয়ে তৈরি। অতিরিক্ত গ্লো, জেনেরিক গ্রেডিয়েন্ট এবং অতিরিক্ত ছায়া এড়িয়ে চলতে হবে।

## ৭. প্রযুক্তিগত ও ডাউনলোডের শর্ত

- Next.js App Router, TypeScript, Tailwind CSS।
- স্থানীয় JSON-এ প্রশ্ন, উত্তর ও স্কোরিং নিয়ম।
- localStorage-এ উত্তর ও প্রগ্রেস সংরক্ষণ।
- কোনো ডেটাবেস, লগইন বা সার্ভার-সাইড ইউজার প্রোফাইল নয়।
- `html-to-image` বা সমমানের লাইব্রেরি দিয়ে কার্ড এক্সপোর্ট।
- PNG: 1080 × 1350 px; JPG: 1080 × 1350 px, 95% কোয়ালিটি।
- ডেস্কটপ ও মোবাইল ব্রাউজারে ডাউনলোড পরীক্ষা।
- Facebook, Messenger ও Instagram ইন-অ্যাপ ব্রাউজারে ব্যর্থ হলে ছবি দেখানোর আলাদা সেভ স্ক্রিন।
- WhatsApp ও Facebook-এর জন্য শেয়ার অ্যাকশন এবং Instagram Story-র জন্য সেভ-অ্যান্ড-শেয়ার নির্দেশনা।
- স্টোরেজ বা ডাউনলোড ব্যর্থ হলে ব্যবহারকারীকে স্পষ্ট বার্তা ও বিকল্প ব্যবস্থা দিতে হবে।

## ৮. সফলতার মাপকাঠি

প্রথম সংস্করণে দেখতে হবে:

- কতজন ল্যান্ডিং পেজ থেকে কুইজ শুরু করছে।
- কতজন কুইজ সম্পন্ন করছে।
- কতজন কার্ড তৈরি বা ডাউনলোড করছে।
- কতজন শেয়ার বাটনে ক্লিক করছে।
- শেয়ার থেকে কতজন নতুন ব্যবহারকারী আসছে।

প্রাথমিক লক্ষ্য হবে এমন একটি বাংলা অভিজ্ঞতা তৈরি করা, যেখানে ব্যবহারকারী ফলাফল দেখে সত্যিই মনে করে, “এটা তো একদম আমার ছোটবেলা!”

চূড়ান্ত পজিশনিং: শৈশব কোনো সাধারণ কুইজ নয়; এটি বাংলাদেশের বিভিন্ন সময় ও অভিজ্ঞতার শৈশবকে ব্যক্তিগত স্মৃতি, পরিচয় এবং শেয়ারযোগ্য গল্পে রূপান্তর করার একটি নস্টালজিয়া-চালিত ওয়েব অ্যাপ।