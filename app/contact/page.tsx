import type { Metadata } from "next";
import { Ph } from "@/components/Placeholder";
import { PageHead, SocialLinks } from "@/components/Print";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHead href="/contact/" title="Contact">
        For sponsorship, press, school visits or questions about the team.
      </PageHead>

      <section className="container cols" aria-label="Contact details and form">
        <div className="span-5">
          <table className="ledger">
            <tbody>
              <tr>
                <th scope="row">General</th>
                <td>
                  <Ph>{site.email}</Ph>
                </td>
              </tr>
              <tr>
                <th scope="row">Sponsorship</th>
                <td>
                  <Ph>{site.sponsorEmail}</Ph>
                </td>
              </tr>
              <tr>
                <th scope="row">Based at</th>
                <td>
                  <Ph>{site.base}</Ph>
                </td>
              </tr>
              <tr>
                <th scope="row">Social</th>
                <td>
                  <SocialLinks />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="span-7">
          <form className="form" aria-describedby="form-status">
            <h2 className="form__h">Message form</h2>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="topic">About</label>
              <select id="topic" name="topic" defaultValue="Sponsorship">
                <option>Sponsorship</option>
                <option>Press</option>
                <option>School visit</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field field--stack">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" />
            </div>
            <p id="form-status" className="form__note">
              This form is not connected yet. Until it is, please email us.
            </p>
            <div>
              <button type="submit" className="button" disabled>
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
