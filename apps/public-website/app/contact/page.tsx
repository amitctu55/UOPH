import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Contact"
        title="Tell us how you want to use UPCHAR."
        description="Sales, partnerships, support, and press — we respond within one business day."
      />

      <section className="section split">
        <form className="form-stack soft-panel">
          <label>
            Full name
            <input name="name" type="text" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Topic
            <select name="topic" defaultValue="general" required>
              <option value="general">General inquiry</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="partnership">Partnership</option>
              <option value="careers">Careers</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows={6} required />
          </label>
          <button type="submit" className="btn btn--primary">
            Send message
          </button>
        </form>

        <div>
          <h2>Reach us directly</h2>
          <ul className="list-clean">
            <li>
              <strong>Email</strong>
              <div>
                <a href="mailto:info@upchar.health">info@upchar.health</a>
              </div>
            </li>
            <li>
              <strong>Phone</strong>
              <div>
                <a href="tel:+18008724271">1-800-872-4271</a>
              </div>
            </li>
            <li>
              <strong>Headquarters</strong>
              <div>123 Healthcare Innovation Drive, Medical District</div>
            </li>
            <li>
              <strong>Hours</strong>
              <div>Mon–Fri 8:00–18:00 ET</div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
