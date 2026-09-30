import Hero from '../../components/Legal/Hero';
import Nav from '../../components/Legal/Nav';

const Terms = () => {

  const HeroData = {
    updatedAt: `Last Updated On: 29 September 2026`,
    title: "Terms and Conditions ",
    description:
      "We may change these Terms. When we do, we will publish the updated version on this page with a new version number and effective date, and a short summary of what changed. Where a change materially affects your rights we will tell you by email or in the app before it takes effect, and where the law requires it we will ask you to agree.",
  };

  return (
    <div className=" flex flex-col">
      <Hero {...HeroData} />
      <div className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-4">
        <div className="">
          <Nav activeSectionData={"TERMS"} />
        </div>
        <div className=" ">
          <h1 className="text-xl font-bold pb-4">
            Terms and Conditions
          </h1>
          <p className="pb-4">
            This website and the Wedlock app are operated by:
          </p>
          <p className="font-semibold">Wedlock Global Services (Australia) Pty Ltd</p>
          <p>ABN 36 679 422 738 · ACN 679 422 738</p>
          <p>Level 3, Suite 329, 98–100 Elizabeth Street, Melbourne VIC 3000, Australia</p>
          <p className="pb-4">info@wedlock.com.au · 1300 933 562</p>
          <p className="pb-4">
            In these Terms, “Wedlock”, “we”, “our” and “us” mean Wedlock Global
            Services (Australia) Pty Ltd.
          </p>
          <p className="pb-4">
            Welcome to Wedlock’s Terms and Conditions of Use (these “Terms”).
            This is a contract between you and us, and we want you to know your
            rights and ours before you use the Wedlock website or app
            (“Wedlock” or the “App”). Please take a few moments to read these
            Terms, because once you access, view or use the App you are legally
            bound by them. Please also read our Community Guidelines, which form
            part of these Terms, and our Privacy Policy.
          </p>

          <h3 className="text-md font-bold ">1. Creating and keeping an account</h3>
          <p className="pb-4">
            Before you can use the App you need to register for an account
            (“Account”). To create an Account you must:
          </p>
          <p className="pb-4">1. be at least 18 years old; and</p>
          <p className="pb-4">
            2. be legally permitted to use the App under the laws of the country
            you live in.
          </p>
          <p className="pb-4">
            We monitor for underage use. We will suspend or terminate an
            Account, or ask you to verify your age, if we have reason to believe
            a member may be under 18.
          </p>
          <p className="pb-4">
            You may not use another person’s Account, or let anyone else use
            yours.
          </p>
          <h3 className="text-md font-bold">Deleting your account</h3>
          <p className="pb-4">
            You can delete your Account at any time from the Settings page when
            you are logged in. When you do:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              your profile stops appearing in search and matching straight away;
            </li>
            <li>
              after 30 days your personal information is permanently erased and
              cannot be recovered;
            </li>
            <li>
              it is expired and removed from our backups after 1 day;
            </li>
            <li>
              we keep payment and tax records for 5 years, because tax law
              requires it, and a one-way code that stops a removed member
              re-registering immediately.
            </li>
          </ul>
          <p className="pb-4">
            We will show you what will happen before you confirm, and email you
            once erasure is complete. Deleting your Account is final —
            registering again with the same email address creates a new, empty
            Account, it does not restore the old one.
          </p>
          <h3 className="text-md font-bold">When we may suspend or close an account</h3>
          <p className="pb-4">
            We use a combination of automated systems, member reports and a team
            of moderators to review accounts and content for breaches of these
            Terms. We may suspend or terminate an Account, restrict access to
            the App, or take other reasonable steps to enforce these Terms,
            where a member:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>breaches these Terms or our Community Guidelines;</li>
            <li>
              behaves in a way, on or off the App, that we reasonably consider
              to be unsafe, unlawful or seriously inappropriate towards another
              member; or
            </li>
            <li>
              uses the App in a way that puts other members, or the service
              itself, at risk.
            </li>
          </ul>
          <p className="pb-4">
            Where it is reasonable to do so we will tell you first and give you
            a chance to respond. If we close a paid Account for a reason that is
            not your fault, we will refund the unused part of your term. If we
            close it because of conduct of the kind listed above, we may decline
            a refund — but nothing in this paragraph limits your rights under
            the Australian Consumer Law (see section 8).
          </p>
          <p className="pb-4">
            If you believe we have made a mistake, you can appeal by emailing
            info@wedlock.com.au. We will acknowledge your appeal within 1
            business day and give you a decision within 10 business days.
          </p>
          <p className="pb-4">
            You may not access, tamper with, or use non-public areas of the App
            or our systems.
          </p>

          <h2 className="text-md font-bold">2. Content on Wedlock</h2>
          <p>There are three kinds of content on the App:</p>
          <ul className="list-decimal pl-4  pb-4">
            <li>content you upload and provide (“Your Content”);</li>
            <li>content other members provide (“Member Content”); and</li>
            <li>
              content we provide, including our databases and software (“Our
              Content”).
            </li>
          </ul>
          <h3 className="text-md font-bold">Content we cannot allow</h3>
          <p className="pb-4">
            Our Community Guidelines form part of these Terms and set out what
            content and conduct is acceptable on and off the App. You agree to
            comply with them. We do not allow content which:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              is illegal, or encourages or incites illegal activity;
            </li>
            <li>is harmful to minors;</li>
            <li>is defamatory;</li>
            <li>
              infringes anyone else’s rights, including intellectual property
              and privacy rights;
            </li>
            <li>shows another person without their consent;</li>
            <li>
              is obscene, pornographic, violent, or otherwise offends human
              dignity;
            </li>
            <li>
              is abusive, insulting, threatening or discriminatory, or promotes
              hatred;
            </li>
            <li>
              is commercial or promotional, including advertising and links to
              other services;
            </li>
            <li>is junk mail or spam;</li>
            <li>
              impersonates someone, or is intended to deceive or manipulate,
              including scams and inauthentic behaviour;
            </li>
            <li>contains malicious code of any kind; or</li>
            <li>breaches our Community Guidelines in any other way.</li>
          </ul>
          <h3 className="text-md font-bold">Your Content</h3>
          <p className="pb-4">
            Your Content must comply with our Community Guidelines. You are
            responsible for Your Content.
          </p>
          <p className="pb-4">
            Do not put personal contact or banking details on your profile —
            your own or anyone else’s. If you choose to share personal
            information with another member, that is at your own risk, and we
            encourage the same caution you would use anywhere else online.
          </p>
          <p className="pb-4">
            Wedlock is a community, so Your Content will be visible to other
            members. Make sure you are comfortable sharing it before you post.
          </p>
          <p className="pb-4">
            By uploading Your Content you confirm you have the rights to do so,
            and you grant us a non-exclusive, royalty-free licence to host,
            store, reproduce and display Your Content for the purpose of
            operating the App — that is, showing it to other members, running
            our matching and search features, and moderating content for safety.
            That licence lasts while Your Content is on the App and for the
            short period afterwards needed to remove it from our systems and
            backups.
          </p>
          <p className="pb-4">
            We will not use Your Content in advertising or marketing, and we
            will not sub-license it to anyone other than the service providers
            who host and operate the App on our behalf, without asking you
            first.
          </p>
          <p>
            We are not obliged to store Your Content. If something matters to
            you, keep your own copy.
          </p>
          <p className="pb-4">
            So that we can act against the unauthorised use of Your Content
            outside Wedlock, you authorise us — but do not require us — to send
            takedown notices on your behalf.
          </p>
          <h3 className='text-md font-bold'>Member Content </h3>
          <p className="pb-4">
            Member Content belongs to the member who posted it. You have no
            rights in it, and you may only use another member’s personal
            information for the purpose of getting to know that person through
            Wedlock. You may not use it for commercial purposes, or to spam,
            harass, stalk or threaten. We may close your Account if you misuse
            another member’s information.
          </p>
          <h3 className="text-md font-bold">Our Content </h3>
          <p className="pb-4">
            Everything else on Wedlock — text, graphics, interfaces, trade
            marks, logos, artwork, our software and databases — is owned,
            controlled or licensed by us and protected by intellectual property
            law.
          </p>
          <p className="pb-4">
            We grant you a non-exclusive, limited, personal, non-transferable,
            revocable licence to access and use Our Content, on the condition
            that you:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              do not use, sell, modify or distribute Our Content except as the
              App allows;
            </li>
            <li>
              do not use our name in metatags, keywords or hidden text;
            </li>
            <li>
              do not create derivative works from Our Content, or scrape,
              decompile or commercially exploit it; and
            </li>
            <li>use Our Content only for lawful purposes.</li>
          </ul>
          <h3 className="text-md font-bold">Moderation</h3>
          <p className="pb-4">
            We do not pre-screen all content, but we may review, refuse or
            remove any content, including messages between members, where we
            consider it necessary to keep members safe or to enforce these
            Terms.
          </p>
          <h3>How matching works</h3>
          <p className="pb-4">
            We use matching algorithms to suggest members you may be compatible
            with. Our Privacy Policy explains what those systems use and how to
            ask a person to review a decision that affects your account.
          </p>

          <h3 className="text-md font-bold">3. How you agree to behave</h3>
          <p>You agree to: </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              comply with all applicable laws, including privacy, intellectual
              property, anti-spam and equal opportunity laws;
            </li>
            <li>use your real name and real age on your profile; and</li>
            <li>
              use Wedlock in a safe, inclusive and respectful way, and follow
              our Community Guidelines.
            </li>
          </ul>
          <p>You agree that you will not:</p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              act unlawfully or disrespectfully, including dishonestly,
              abusively or in a discriminatory way;
            </li>
            <li>
              misrepresent your identity, age, qualifications or affiliations;
            </li>
            <li>disclose information you do not have consent to disclose;</li>
            <li>stalk or harass another member;</li>
            <li>
              use the App deceptively or manipulatively, including scams, spam,
              inauthentic profiles and commercial activity;
            </li>
            <li>submit reports or complaints that are manifestly unfounded; or</li>
            <li>
              use software, scripts, bots, crawlers or any other means to
              scrape or copy profiles or other data from the App.
            </li>
          </ul>
          <p className="pb-4">
            You can report abuse or complain about Member Content by contacting
            us with the details. We may investigate possible breaches of these
            Terms and remove content or suspend accounts as described in
            section 1.
          </p>
          <p className="pb-4">
            We do not control what members say or do, and you are responsible
            for your own interactions with other members. We do not conduct
            criminal background checks on members — see section 9.
          </p>
          <p className="pb-4">
            Scraping or replicating any part of the App without our prior
            written consent is prohibited.
          </p>

          <h3 className="font-bold text-md">4. Privacy </h3>
          <p className="pb-4">
            Our Privacy Policy explains how we collect, use, disclose and
            protect your personal information. By using Wedlock you acknowledge
            that we handle your information in accordance with that policy.
          </p>

          <h3 className="font-bold text-md">5. Plans, payments and refunds</h3>
          <h3 className="text-md font-bold">In-app purchases</h3>
          <p className="pb-4">
            Wedlock offers paid plans and features for purchase (“In-App
            Purchase”). Additional terms may be shown to you at the point of
            purchase and form part of these Terms.
          </p>
          <p className="pb-4">
            You may pay through a third-party app store such as Google Play, or
            with a credit card, debit card or PayPal account processed by a
            third-party payment processor. Once you make an In-App Purchase you
            authorise us to charge your chosen payment method.
          </p>
          <h3 className="text-md font-bold">Prices and GST</h3>
          <p className="pb-4">
            All prices shown on our website and in our app are in Australian
            dollars and include GST where GST applies. The amount shown is the
            total amount you will be charged; there are no additional fees or
            charges. We will issue a tax invoice for each purchase to the email
            address on your account.
          </p>
          <h3 className="text-md font-bold">Subscriptions do not automatically renew</h3>
          <p className="pb-4">
            Wedlock plans are fixed-term purchases. They do not renew
            automatically and your payment method is not charged again when the
            term ends.
          </p>
          <p className="pb-4">
            When you purchase a Premium or Exclusive plan you receive access to
            that plan’s features for the term you paid for — one calendar month,
            or 365 days for an annual plan — starting on the date of purchase.
          </p>
          <p className="pb-4">
            We will email you 7 days and 1 day before your term ends. On the day
            it ends your access returns to the free Standard plan. Your profile,
            your matches and your conversations are not deleted.
          </p>
          <p className="pb-4">
            If you want to continue, you purchase a new term yourself. Nothing
            is charged unless you choose to do so.
          </p>
          <h3 className="text-md font-bold">Free trials</h3>
          <p className="pb-4">
            We do not currently offer free trials. If we introduce one, it will
            end without converting to a paid plan and without charging you.
          </p>
          <h3 className="text-md font-bold">Ending or renewing a plan</h3>
          <p className="pb-4">
            Your plan ends by itself on the last day of the term you paid for,
            and nothing further is charged. You can see the end date, and buy a
            new term if you want one, under Manage plan in your account
            settings. If you bought your plan through Google Play, you can also
            manage it in your Google Play account.
          </p>
          <p className="pb-4">
            Because Wedlock can be used without a paid plan, letting a plan end
            does not remove your profile. If you want to close your account
            entirely, see section 1.
          </p>
          <h3 className="text-md font-bold">Refunds</h3>
          <p className="pb-4">
            Your rights under the Australian Consumer Law are set out in
            section 8 and are not affected by anything in this section.
          </p>
          <p className="pb-4">
            We will refund you in full where: you were charged more than once
            for the same term; you were charged after your plan ended; the paid
            features were unavailable for a significant part of your term; or
            the law otherwise requires it.
          </p>
          <p className="pb-4">
            <span className="font-semibold">Change of mind.</span> If you
            contact us within 48 hours of purchase and have not used the paid
            features, we will refund you in full.
          </p>
          <p className="pb-4">
            <span className="font-semibold">How to request a refund.</span>{" "}
            Email info@wedlock.com.au from the address on your account, or write
            to Level 3, Suite 329, 98–100 Elizabeth Street, Melbourne VIC 3000.
            Include your order number and what happened. We will acknowledge
            within 2 business days and decide within 10 business days, and we
            will tell you the reason for our decision.
          </p>
          <p className="pb-4">
            If you purchased through Google Play, you may also request a refund
            through Google Play. If we cannot resolve your complaint you can
            contact the ACCC at accc.gov.au or Consumer Affairs Victoria at
            consumer.vic.gov.au.
          </p>
          <h3 className="text-md font-bold">Changes to pricing and features</h3>
          <p className="pb-4">
            We may change our prices, and we may add, change or withdraw
            features. Any change to the price of a plan applies only to plans
            purchased after the change — it never affects a term you have
            already paid for. We may limit or discontinue any offer, promotion
            or discount.
          </p>

          <h3>6. Push notifications and location features</h3>
          <p className="pb-4">
            We may send you emails, text messages, push notifications, alerts
            and other messages related to the App and the Site, such as
            enhancements, offers, products, events and other promotions. After
            downloading the App you may be asked to accept or decline push
            notifications. You can change this at any time in your device
            settings. For emails and text messages, you can unsubscribe using
            the link in the message.
          </p>

          <h3 className="font-bold text-md">7. Your rights under Australian Consumer Law</h3>
          <p className="pb-4">
            Our services come with guarantees that cannot be excluded under the
            Australian Consumer Law. Nothing in these Terms excludes, restricts
            or modifies any guarantee, right or remedy you have under the
            Australian Consumer Law or any other law that cannot lawfully be
            excluded, restricted or modified.
          </p>
          <p className="pb-4">
            For major failures with the service, you are entitled to cancel your
            subscription and to a refund for the unused portion, or to
            compensation for its reduced value. You are also entitled to be
            compensated for any other reasonably foreseeable loss or damage. If
            the failure does not amount to a major failure, you are entitled to
            have problems with the service rectified in a reasonable time and,
            if this is not done, to cancel your subscription and obtain a refund
            for the unused portion.
          </p>
          <p className="pb-4">
            Every exclusion and limitation in these Terms applies only to the
            extent permitted by law and is subject to this section.
          </p>

          <h3 className="font-bold text-md">8. Disclaimer</h3>
          <p className="pb-4">
            Subject to section 7, and to the extent permitted by law:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              the App, the Site, Our Content and Member Content are provided on
              an “as is” and “as available” basis;
            </li>
            <li>
              we do not warrant that the App or Site will be uninterrupted,
              secure or error free, or that any content on it is correct,
              accurate or reliable;
            </li>
            <li>we do not guarantee the compatibility of any match; and</li>
            <li>
              you are responsible for your own interactions with other members,
              and we are not responsible for the conduct of any member.
            </li>
          </ul>
          <p className="pb-4">
            Wedlock does not conduct criminal background checks on its members.
          </p>

          <h3 className="font-bold text-md">9. Limitation of liability</h3>
          <p className="pb-4">
            Subject to section 7, and to the extent permitted by law, we are not
            liable for indirect, incidental, consequential, special or punitive
            loss, including loss of data, income, profit or goodwill, arising
            out of your use of the App or the Site.
          </p>
          <p className="pb-4">
            Nothing in these Terms limits or excludes our liability for death or
            personal injury caused by our negligence, for fraud or fraudulent
            misrepresentation, or for any other liability that cannot be limited
            by law.
          </p>

          <h3 className="font-bold text-md">10. Indemnity</h3>
          <p className="pb-4">
            To the extent permitted by law, you agree to indemnify us against
            third-party claims, damages, losses and reasonable costs we suffer
            arising out of:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>your negligent acts, omissions or wilful misconduct;</li>
            <li>your use of the App or Site;</li>
            <li>content you upload;</li>
            <li>your breach of these Terms; or</li>
            <li>your breach of any law or of any third party’s rights.</li>
          </ul>
          <p className="pb-4">
            This indemnity does not apply to any unconscionable conduct, fraud,
            deception, false promise, misrepresentation, or concealment or
            omission of a material fact on our part.
          </p>
          <p className="pb-4">
            We may settle any claim brought against us without your prior
            consent. If we ask, you will co-operate reasonably in defending a
            relevant claim.
          </p>

          <h3 className="font-bold text-md">11. Copyright infringement claims</h3>
          <p className="pb-4">
            If you believe content on Wedlock infringes copyright in a work you
            own, send a notice to info@wedlock.com.au containing:
          </p>
          <ul className="list-decimal pl-4 pb-4">
            <li>
              your physical or electronic signature, or that of a person
              authorised to act for the copyright owner;
            </li>
            <li>identification of the work said to be infringed;</li>
            <li>
              identification of the material said to be infringing, with enough
              information for us to locate it;
            </li>
            <li>your contact details;</li>
            <li>
              a statement that you believe in good faith that the use is not
              authorised by the copyright owner, its agent or the law; and
            </li>
            <li>
              a statement that the information in the notice is accurate and
              that you are authorised to act for the copyright owner.
            </li>
          </ul>

          <h3 className="font-bold text-md">12. Third-party app stores</h3>
          <p className="pb-4">
            If you download the App from a third-party app store, the following
            also applies. These Terms are between you and us, not the app store
            provider, and we alone are responsible for the App and its content.
            The app store provider has no obligation to provide support for the
            App, and no warranty obligation in relation to it. We, not the app
            store provider, are responsible for addressing any claim you have
            about the App, including product liability claims, claims that the
            App does not meet a legal requirement, claims under consumer
            protection legislation, and intellectual property claims. Where the
            app store’s own terms conflict with these Terms in relation to the
            App, the app store’s terms apply to that extent. Nothing in this
            section affects your rights under section 7.
          </p>

          <h3 className="font-bold text-md">13. Resolving a dispute</h3>
          <ul className="list-decimal pl-4 space-y-4 pb-4">
            <li>
              <span className="font-semibold">Talk to us first.</span> Email
              info@wedlock.com.au or write to Level 3, Suite 329, 98–100
              Elizabeth Street, Melbourne VIC 3000, describing the problem and
              what you would like us to do. We will acknowledge within 2
              business days and respond substantively within 20 business days.
            </li>
            <li>
              <span className="font-semibold">If we cannot resolve it.</span>{" "}
              You can refer the matter to the Australian Competition and
              Consumer Commission (accc.gov.au), to Consumer Affairs Victoria
              (consumer.vic.gov.au), or to the fair trading body in your state
              or territory. If your complaint concerns your personal
              information, you can complain to the Office of the Australian
              Information Commissioner (oaic.gov.au).
            </li>
            <li>
              <span className="font-semibold">Courts.</span> These Terms are
              governed by the laws of Victoria, Australia. You and Wedlock
              submit to the non-exclusive jurisdiction of the courts of Victoria
              and the courts able to hear appeals from them. Nothing in this
              section prevents either party from seeking urgent interlocutory
              relief, or from bringing a claim in a tribunal or small claims
              jurisdiction where that is available.
            </li>
          </ul>
          <p className="pb-4">
            Nothing in this section limits your rights under the Australian
            Consumer Law or your right to bring or participate in proceedings of
            any kind.
          </p>

          <h3 className="text-md font-bold">14. Termination</h3>
          <p className="pb-4">
            These Terms start on the date you accept them and continue until
            your Account is closed by you or by us in accordance with section 1.
          </p>
          <p className="pb-4">
            When your Account is terminated you lose access to the Account and
            the content in it. Your information is deleted in accordance with
            our Privacy Policy and section 1 of these Terms. The provisions of
            these Terms which by their nature should survive termination will
            survive, including the ownership provisions, the disclaimers in
            section 8, the limitation in section 9 and the indemnity in
            section 10.
          </p>

          <h3 className="text-md font-bold">15. Other things you should know</h3>
          <p className="pb-4">
            These Terms, together with our Community Guidelines and Privacy
            Policy, are the entire agreement between you and us, and replace any
            earlier agreement or representation. Nothing in this clause limits
            liability for fraudulent misrepresentation.
          </p>
          <p className="pb-4">
            We have taken reasonable steps to keep the information on Wedlock
            current, accurate and complete. Subject to section 7, use of the App
            and the material on it is at your own risk.
          </p>
          <p className="pb-4">
            You are responsible for taking reasonable precautions to ensure that
            anything you obtain from Wedlock is free of viruses or other harmful
            components.
          </p>
          <p className="pb-4">
            We may communicate with you electronically. You consent to receiving
            communications from us in electronic form, and agree that electronic
            notices, disclosures and agreements satisfy any requirement that
            they be in writing.
          </p>

          <h3 className="text-md font-bold">Where your information is stored</h3>
          <p className="pb-4">
            Wedlock uses cloud infrastructure and service providers, some of
            which are located outside Australia. Our Privacy Policy names the
            countries involved. Before we disclose your personal information to
            an overseas recipient we take reasonable steps to ensure it is
            handled consistently with the Australian Privacy Principles, and we
            remain accountable to you for how it is handled.
          </p>

          <h3 className="text-md font-bold">Changes to these Terms</h3>
          <p className="pb-4">
            We may change these Terms. When we do, we will publish the updated
            version on this page with a new version number and effective date,
            and a short summary of what changed. Where a change materially
            affects your rights we will tell you by email or in the app before
            it takes effect, and where the law requires it we will ask you to
            agree. Earlier versions remain available at stable links from this
            page.
          </p>
          <p className="pb-4">
            If you do not accept a change, you can stop using Wedlock and close
            your Account. Nothing in this section allows us to change a term of
            a plan you have already paid for.
          </p>

          <h3 className="text-md font-bold">General</h3>
          <p className="pb-4">
            If any part of these Terms is found to be illegal, invalid or
            unenforceable, that part is severed and the rest continues in force.
          </p>
          <p className="pb-4">
            A failure or delay in exercising a right does not waive it.
          </p>
          <p className="pb-4">
            The App may contain links to third-party websites. We are not
            responsible for their availability, accuracy or content, and a link
            does not imply endorsement. Framing or in-line linking to the App
            without our prior written approval is prohibited.
          </p>
          <p className="pb-4">
            You may not transfer or assign these Terms or any rights under them.
            We may assign them, provided doing so does not reduce your rights.
            Where there is a discrepancy between this English version and any
            translation, the English version prevails.
          </p>

          <h3 className="text-md font-bold">16. Governing law</h3>
          <p className="pb-4">
            These Terms are governed by the laws of Victoria, Australia. You and
            Wedlock submit to the non-exclusive jurisdiction of the courts of
            Victoria and the courts able to hear appeals from them.
          </p>

          <p className='text-md font-bold'>Effective date</p>
          <p>Version 2.0 · Effective 11th October 2026</p>
        </div>
      </div>
    </div>
  );
}

export default Terms
