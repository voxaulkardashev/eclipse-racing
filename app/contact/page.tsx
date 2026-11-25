import type { Metadata } from "next";
import { Ph } from "@/components/Placeholder";
import { PageHead, SocialLinks } from "@/components/Print";
import { site } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

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
                  {site.base}
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
