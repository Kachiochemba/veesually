# Contact form: always show success once the request goes out

Confirmed: the form posts to `https://formspree.io/f/xykavngn` (`src/routes/contact.tsx` line 50, used in the `fetch` on line 74). That's the endpoint you referenced.

## Change

In `src/routes/contact.tsx`, simplify `onSubmit` so that any completed network request to Formspree shows the success message. The only case that surfaces an error is a true network failure (the `fetch` itself throws — offline, DNS, CORS reject before sending).

- Drop the response-body parsing and the `json.errors` branch added previously.
- After `await fetch(...)`, regardless of status code, set `sent = true`, clear `errors`, reset the form.
- Keep the `catch` branch: on network failure, show "Couldn't reach the server…".
- Success copy stays "Message sent. We'll be in touch shortly." (currently green/accent under the button).

Net effect: when you fill in the form and click Send, you'll always see the success message unless the request literally couldn't leave the browser.

## Files
- `src/routes/contact.tsx` — `onSubmit` only.

No other changes.
