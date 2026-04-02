import Hero from '../../components/Legal/Hero';
import Nav from '../../components/Legal/Nav';

const Terms = () => {
  const currentDate = new Date().toDateString();
    const HeroData = {
        updatedAt: `Current as of ${currentDate.toLocaleString()}`,
        title: "Terms and Conditions ",
        description:
          "Terms and Conditions are subject to change by Wedlock in its sole discretion at any time. We will notify you of any such changes by posting an updated version of the agreement on this page. Your continued use of the Services after the posting of revisions to this agreement will constitute your acceptance of such revisions.",
      };
    
      return (
        <div className=" flex flex-col">
          <Hero {...HeroData} />
          <div className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-16">
            <div className="">
              <Nav activeSectionData={"TERMS"} />
            </div>
            <div className=" ">
              <h1 className="text-md font-bold pb-4">
                Wedlock Terms and Conditions of Use
              </h1>
              <p className="pb-4">
                Welcome to Wedlock’s Terms and Conditions of Use (these “Terms”).
                This is a contract between you and the Wedlock Global Services (as
                defined further below) and we want you to know yours and our rights
                before you use the Wedlock website or application (“Wedlock” or the
                “App”). Please take a few moments to read these Terms before
                enjoying the App,{" "}
              </p>
              <p className="pb">
                because once you access, view or use the App, you are going to be
                legally bound by these Terms (so probably best to read them first!).
                Please also read our Community Guidelines (which form part of these
                Terms) and our Privacy Policy.
              </p>
              <p className="pb-4">
                Please be aware that if you subscribe to services for a term (the
                “Initial Term”), then the terms of your subscription will be
                automatically renewed for additional periods of the same duration as
                the Initial Term at Wedlock’s then-current fee for such services,
                unless you cancel your subscription in accordance with Section 5
                below.
              </p>
              <p className="pb-4">
                You should also note that Section 13 of these Terms contains
                provisions governing how claims that you and Wedlock Global Services
                have against each other are resolved. In particular, it contains an
                arbitration agreement that will, with limited exceptions, require
                disputes between us to be submitted to binding and final
                arbitration. You have a right to opt out of the arbitration
                agreement pursuant to Section 13 below. If you do not opt out of the
                arbitration agreement in accordance with Section 13, (1) you will
                only be permitted to pursue claims and seek relief against us on an
                individual basis only; and (2) you are waiving your right to seek
                relief in a court of law and to have a jury trial on your claims.
              </p>
              <h3 className="text-md font-bold ">1. WEDLOCK RULES </h3>
              <p className="pb-4">
                Before you can use the App, you will need to register for an account
                (“Account”). In order to create an Account you must:
              </p>
              <p className="pb-4">
                1. be at least 18 years old or the age of majority to legally enter
                into a contract under the laws of your home country if that happens
                to be greater than 18; and
              </p>
              <p className="pb-4">
                2. be legally permitted to use the App by the laws of your home
                country. Please note that we monitor for underage use and we will
                terminate, suspend or ask you to verify your Account if we have
                reason to believe that you may be underage.
              </p>
              <p className="pb-4">
                You can create an Account via manual registration, or by using your
                Facebook login details. If you create an Account using your Facebook
                login details, you authorise us to access, display and use certain
                information from your Facebook account (e.g. profile pictures,
                relationship status, location and information about Facebook
                friends). For more information about what information we use and how
                we use it, please check out our Privacy Policy.
              </p>
              <p className="pb-4">
                Unfortunately, we cannot allow you to use another person’s Account
                or to share your Account with any other person without permission.
              </p>
              <p className="pb-4">
                You’ll have great fun on Wedlock, but if you feel the need to leave,
                you can delete your Account at any time by going to the ‘Settings’
                page when you are logged in and clicking on the ‘Delete account’
                link. Your Account will be deleted immediately but it may take a
                little while for Your Content (defined below) to be completely
                removed from the App or Site. Your profile information will be
                treated in accordance with our Privacy Policy. If you delete your
                Account and try to create a new account within this time period
                using the same credentials, we will re-activate your Account for
                you.
              </p>
              <p className="pb-4">
                We use a combination of automated systems, user reports and a team
                of moderators to monitor and review accounts and content to identify
                breaches of these Terms. We reserve the right at our sole discretion
                to terminate or suspend any Account, restrict access to the App, or
                make use of any operational, technological, legal or other means
                available to enforce the Terms (including without limitation
                blocking specific IP addresses). For all users, we may take such
                action, at any time without liability and without the need to give
                you prior notice. Without limiting the foregoing in any way and
                unless otherwise prohibited by mandatory laws in the country in
                which you reside, we expressly reserve the right to terminate or
                suspend your Account without notice (1) for violating these Terms,
                (2) due to your conduct on the website and App, or your conduct with
                other users of the App or Site (including your “offline” conduct),
                if we, in our sole discretion, determine your conduct was
                inappropriate or improper, (3) if we or our affiliates, in our or
                their sole discretion, determine your conduct on other apps operated
                by our affiliates was inappropriate or improper, or (4) for any
                reasons whatsoever that we deem, in our sole discretion, justifies
                termination. If your Account is terminated or suspended, you agree
                you will not receive a refund for any paid service or features you
                have already been charged for. If you believe that we’ve made a
                mistake in taking action on your Account or Your Content (defined
                below), you can appeal using the processes outlined within the App
                or Site or by getting in touch using our contact details.
              </p>
              <p className="pb-4">
                You may not access, tamper with, or use non-public areas of the
                website of App or our systems. Certain portions of the App or Site
                may not be accessible if you have not registered for an Account.
              </p>
              <h2 className="text-md font-bold">2. TYPES OF CONTENT</h2>
              <p>
                There are three types of content that you will be able to access on
                the App or Site:{" "}
              </p>
              <ul className="list-decimal pl-4  pb-4">
                <li>content that you upload and provide (“Your Content”);</li>
                <li>content that members provide (“Member Content”); and</li>
                <li>
                  content that the Wedlock Global Services provides (including,
                  without limitation, database(s) and/or software) (“Our Content”).
                </li>
              </ul>
              <h3 className="text-md font-bold">
                {" "}
                There is certain content we can’t allow on Wedlock
              </h3>
              <p className="pb-4">
                Our Community Guidelines form part of these Terms and outline what
                content and conduct is accepted on and off our App. You agree to
                comply with our Community Guidelines as may be updated from time to
                time.
              </p>
              <p className="pb-4">
                We want our users to be able express themselves as much as possible
                on Wedlock, but we have to impose restrictions on certain content
                which:
              </p>
              <ul className="list-disc pl-4">
                <li>
                  is illegal or encourages, promotes or incites any illegal
                  activity;
                </li>
                <li>is harmful to minors;</li>
                <li>is defamatory or libellous;</li>
                <li>
                  itself, or the posting of which, infringes any third party’s
                  rights (including, without limitation, intellectual property
                  rights and privacy rights);
                </li>
                <li>
                  shows another person which was created or distributed without that
                  person’s consent;
                </li>
                <li>
                  contains language or imagery which could be deemed offensive or is
                  likely to harass, upset, embarrass, alarm or annoy any other
                  person;
                </li>
                <li>
                  is obscene, pornographic, violent or otherwise may offend human
                  dignity;
                </li>
                <li>
                  is abusive, insulting or threatening, discriminatory or which
                  promotes or encourages racism, sexism, hatred or bigotry;
                </li>
                <li>
                  relates to commercial activities (including, without limitation,
                  sales, competitions and advertising, links to other websites or
                  premium line telephone numbers);
                </li>
                <li>involves the transmission of “junk” mail or “spam”;</li>
                <li>
                  impersonates or intends to deceive or manipulate a person
                  (including, without limitation, scams and inauthentic behaviour);
                </li>
                <li>
                  contains any spyware, adware, viruses, corrupt files, worm
                  programs or other malicious code designed to interrupt, damage or
                  limit the functionality of or disrupt any software, hardware,
                  telecommunications, networks, servers or other equipment, Trojan
                  horse or any other material designed to damage, interfere with,
                  wrongly intercept or expropriate any data or personal information
                  whether from Wedlock or otherwise; or
                </li>
                <li>in any other way violates our Community Guidelines.</li>
              </ul>
              <h3 className="text-md font-bold">Your Content</h3>
              <p className="pb-4">
                You agree that Your Content must comply with our Community
                Guidelines as updated from time to time. As Your Content is unique,
                you are responsible and liable for Your Content. You will indemnify,
                defend, release, and hold us harmless from any claims made in
                connection with Your Content. Sorry that was a bit of a mouthful,
                but you are what you post!
              </p>
              <p className="pb-4">
                You may not display any personal contact or banking information on
                your individual profile page whether in relation to you or any other
                person (for example, names, home addresses or postcodes, telephone
                numbers, email addresses, URLs, credit/debit card or other banking
                details). If you do choose to reveal any personal information about
                yourself to other users, whether via email or otherwise, it is at
                your own risk. We encourage you to use the same caution in
                disclosing details about yourself to third parties online as you
                would under any other circumstances.
              </p>
              <p className="pb-4">
                As Wedlock is a public community, Your Content will be visible to
                other users of the App all around the world - so make sure you are
                comfortable sharing Your Content before you post. As such, you agree
                that Your Content may be viewed by other users and any person
                visiting, participating in or who is sent a link to the App or Site
                (e.g. individuals who receive a link to a user’s profile or shared
                content from other Wedlock Users). By uploading Your Content on
                Wedlock, you represent and warrant to us that you have all necessary
                rights and licences to do so, and automatically grant us a
                non-exclusive, royalty free, perpetual, worldwide licence to use
                Your Content in any way (including, without limitation, editing,
                copying, modifying, adapting, translating, reformatting, creating
                derivative works from, incorporating into other works, advertising,
                distributing and otherwise making available to the general public
                such Content, whether in whole or in part and in any format or
                medium currently known or developed in the future).
              </p>
              <p className="pb-4">
                We may assign and/or sub-license the above licence to our affiliates
                and successors without any further approval by you.
              </p>
              <p>
                We do not have any obligation to store Your Content - if it’s
                important, you should make a copy.
              </p>
              <p className="pb-4">
                So that we can prevent the unconsented use of Your Content by other
                members or third parties outside of Wedlock, you authorise us to act
                on your behalf with respect to such infringing and/or unauthorised
                uses. This expressly includes the authority, but not the obligation,
                for us to send takedown notices on your behalf if Your Content is
                taken and used by third parties outside of Wedlock.
              </p>
              <h3>Member Content </h3>
              <p className="pb-4">
                Other members of Wedlock will also share content via the App or
                Site. Member Content belongs to the user who posted the content and
                is stored on our servers and displayed via the App or Site at the
                direction of the user providing the Member Content.
              </p>
              <p className="pb-4">
                You do not have any rights in relation to other users’ Member
                Content, and you may only use other Wedlock users’ personal
                information to the extent that your use of it matches Wedlock’s
                purpose of allowing people to meet one another. You may not use
                other users’ information for commercial purposes, to spam, to
                harass, stalk or to make unlawful threats. We reserve the right to
                terminate your Account if you misuse other users’ information.
              </p>
              <h3 className="text-md font-bold">Our Content </h3>
              <p className="pb-4">
                You may be wondering what happens to the rest of the Content on
                Wedlock. Well, it belongs to us! Any other text, content, graphics,
                user interfaces, trademarks, logos, sounds, artwork, and other
                intellectual property appearing on Wedlock, as well as the Wedlock
                software and database(s), are owned, controlled or licensed by us
                and are protected by copyright, trademark, data, database rights
                and/or other intellectual property law rights. All right, title and
                interest in and to Our Content remains with us at all times.
              </p>
              <p className="pb-4">
                We grant you a non-exclusive, limited, personal, non-transferable,
                revocable, licence to access and use Our Content, without the right
                to sublicense, under the following conditions:
              </p>
              <ul className="list-decimal pl-4 pb-4">
                <li>
                  you shall not use, sell, modify, or distribute Our Content except
                  as permitted by the functionality of the App or Site;
                </li>
                <li>
                  you shall not use our name in metatags, keywords and/or hidden
                  text;
                </li>
                <li>
                  you shall not create derivative works from Our Content or scrape,
                  disable, decompile, analyse or in any way commercially exploit Our
                  Content, in whole or in part, in any way; and
                </li>
                <li>
                  you shall use Our Content for lawful purposes only. We reserve all
                  other rights.
                </li>
              </ul>
              <h3 className="text-md font-bold">No Obligation to Pre-Screen Content. </h3>
              <p className="pb-4">While we don’t assume any obligation to pre-screen any of Your Content or any Member Content, there may be times where we need to step in to help keep our members safe, and we reserve the right to review, pre-screen, refuse and/or remove any Member Content and Your Content, including content exchanged between users in direct messages as set out in these Terms.
              </p>
              <h3>Use of Recommender Systems.</h3>
              <p className="pb-4">We have developed matching algorithms to predict your compatibility with other users and so we can show you people we think are a good match for you. You can learn more about our use of recommender systems and the main parameters we use in our Privacy Policy.
              </p>
              <h3 className="text-md font-bold">3. RESTRICTIONS ON THE APP</h3>
              <p>You agree to: </p>
              <ul className="list-decimal pl-4 pb-4">
                <li>comply with all applicable laws, including without limitation, privacy laws, intellectual property laws, anti-spam laws, equal opportunity laws and regulatory requirements;
                </li>
                <li>use your real name and real age in creating your Wedlock account and on your profile; and
                </li>
                <li>use the services in a safe, inclusive and respectful manner and adhere to our Community Guidelines at all times. 
                </li>
                <p>You agree that you will not:
                </p>
                
                <li>act in an unlawful or disrespectful manner including being dishonest, abusive or discriminatory;
                </li>
                <li>misrepresent your identity, your age, your current or previous positions, qualifications or affiliations with a person or entity;
                </li>
                <li>disclose information that you do not have the consent to disclose;
                </li>
                <li>stalk or harass any other user of the App or Site;
                </li>
                <li>use the App or Site in any deceptive, inauthentic or manipulative way, including engaging in conduct or distributing content relating to scams, spam, inauthentic profiles or commercial and promotional activity;
                </li>
                <li>submit appeals, reports, notices or complaints that are manifestly unfounded; or;
                </li>
                <li>develop, support or use software, devices, scripts, robots, other types of mobile code or any other means or processes (including crawlers, browser plugins and add-on or other technology) to scrape or otherwise exfiltrate from Wedlock or its services, or otherwise copy profiles and other data from the services.
                </li>
    
                </ul>
                <p className="pb-4">We don’t like users misbehaving in the Wedlock community. You can report any abuse or complain about Member Content by contacting us, outlining the abuse and/or complaint. We reserve the right to investigate any possible violations of these Terms, any Wedlock user’s rights, or any third-party rights and we may, in our sole discretion, immediately terminate any user’s right to use of the App or Site without prior notice, as set out further in Section 1 above, and/or remove any improper, infringing or otherwise unauthorised Member Content submitted to the App or Site.
                </p>
                <p className="pb-4">We don’t control any of the things our users say or do, so you are solely responsible for your interactions with other users of the App or Site.
                </p>
                <p className="pb-4">
                  IN CERTAIN CIRCUMSTANCES, SUCH AS IN RESPONSE TO MEMBER-GENERATED OR PRESS REPORTS OF SUSPECTED MISCONDUCT, THE WEDLOCK GLOBAL SERVICES MAY INVESTIGATE WHETHER A MEMBER HAS A CRIMINAL HISTORY, WHICH MAY, DEPENDING ON THE CIRCUMSTANCES, INCLUDE SEARCHING SEX OFFENDER REGISTRIES OR OTHER PUBLIC RECORDS. IF SUCH INVESTIGATIONS IDENTIFY A PERSON WITH A CRIMINAL CONVICTION, THE WEDLOCK GLOBAL SERVICES MAY USE AVAILABLE INFORMATION TO DETERMINE WHETHER THE PERSON IDENTIFIED BY THE INVESTIGATION IS THE SAME PERSON AS THE MEMBER ABOUT WHOM THE INVESTIGATION WAS CONDUCTED. FOLLOWING ANY SUCH INVESTIGATION, WITH RESPECT TO ANY MEMBER THAT THE WEDLOCK GLOBAL SERVICES REASONABLY BELIEVES TO HAVE BEEN CONVICTED OF A SEX OFFENCE (SUCH AS SEXUAL ASSAULT OR SEXUAL HARASSMENT, AND INCLUDING ANY REGISTERED SEX OFFENDERS), OR A CONVICTION FOR HUMAN TRAFFICKING, STALKING, KIDNAPPING, CHILD ABUSE, DOMESTIC ABUSE, MURDER, HATE CRIMES, OR TERRORISM OR VIOLENT EXTREMISM, THE WEDLOCK GLOBAL SERVICES MAY TAKE STEPS TO BLOCK THAT PERSON FROM USING THE SERVICE AND COMMUNICATING WITH OTHER MEMBERS OVER THE PLATFORM. THE WEDLOCK GLOBAL SERVICES RESERVES THE RIGHT TO BLOCK MEMBERS FOR OTHER OFFENCES, OR FOR OTHER VIOLATIONS OF THESE TERMS, OR FOR OTHER REASONS IN THEIR SOLE DISCRETION. CRIMINAL BACKGROUND INVESTIGATIONS, WHEN CONDUCTED, ARE NOT TYPICALLY UPDATED BY THE WEDLOCK GLOBAL SERVICES. ADDITIONALLY, WHILE INVESTIGATIONS FOR CRIMINAL HISTORIES MAY BE CONDUCTED ON SOME MEMBERS, THEY ARE NOT FOOLPROOF AND MOST MEMBERS ARE NOT EXPECTED TO BE SUBJECT TO ANY FORM OF CHECK FOR CRIMINAL HISTORIES. ANY INVESTIGATIONS FOR CRIMINAL HISTORIES MAY GIVE MEMBERS A FALSE SENSE OF SECURITY. THE CHECKS FOR CRIMINAL HISTORIES THAT MAY BE CONDUCTED BY THE WEDLOCK GLOBAL SERVICES ARE NOT A PERFECT SAFETY SOLUTION. CRIMINALS MAY CIRCUMVENT EVEN THE MOST SOPHISTICATED SEARCH TECHNOLOGY. NOT ALL CRIMINAL RECORDS ARE PUBLIC IN ALL STATES AND NOT ALL DATABASES ARE UP TO DATE. ONLY PUBLICLY AVAILABLE CONVICTIONS ARE INCLUDED IN CHECKS, AND CHECKS DO NOT COVER OTHER TYPES OF CONVICTIONS OR ARRESTS OR ANY CONVICTIONS FROM FOREIGN COUNTRIES.
                </p>
                <p className="pb-4">
                You agree to, and hereby do, release Wedlock Global Services and its successors from any claims, demands, losses, damages, rights, and actions of any kind, including personal injuries, death and property damage, that either directly or indirectly arises from your interactions with or conduct of other users of the App or Site.
    
                </p>
                <p className="pb-4">
                Scraping or replicating any part of the App or Site without our prior consent is expressly prohibited. This includes by any means (automated or otherwise) other than through our currently available, published interfaces - unless you have been specifically allowed to do so in a separate agreement with us.
    
                </p>
                <h3 className="font-bold text-md">4. PRIVACY </h3>
                <p>For information about how the Wedlock Global Services collects, uses, and shares your personal data, please check out our Privacy Policy. By using Wedlock, you acknowledge that we may use such data in accordance with our Privacy Policy.
                </p>
                <p>
                Generally.
                </p>
                <p className="pb-4">Wedlock may offer products and services for purchase on App (“In-App Purchase”). If you choose to make an In-App Purchase, you acknowledge and agree that additional terms, disclosed to you at the point of purchase, may apply, and that such additional terms are incorporated herein by reference.
                </p>
                <p className="pb-4">You may make an In-App Purchase through the following payment methods (“Payment Method”): (a) making a purchase through a third-party platform such as the Apple App Store and Google Play Store (“Third Party Store”), or (b) paying with your credit card, debit card, or PayPal account, which will be processed by a third-party processor. Once you have made an In-App Purchase, you authorise us to charge your chosen Payment Method. If payment is not received by us from your chosen Payment Method, you agree to promptly pay all amounts due upon demand by us.
                </p>
                <p className="pb-4">
                Subscriptions and Auto-Renewal: Wedlock may offer some services as automatically-renewing subscriptions, e.g., a three-month subscription, six-month subscription, or one-year subscription (“Standard or Premium Services”). IF YOU PURCHASE AN AUTOMATICALLY RENEWING SUBSCRIPTION, YOUR SUBSCRIPTION WILL RENEW AT THE END OF THE PERIOD, UNLESS YOU CANCEL, AT WEDLOCK’S THEN-CURRENT PRICE FOR SUCH SUBSCRIPTIONS. To avoid charges for a new subscription period, you must cancel, as described below, before the end of the then-current subscription period. Deleting your account or deleting the application from your device does not cancel your subscription. You will be given notice of changes in the pricing of the Premium Services to which you have subscribed and an opportunity to cancel. If Wedlock changes these prices and you do not cancel your subscription, you agree that you will be charged at Wedlock’s then-current pricing for subscription.
    
                </p>
                <p className="pb-4">
                Cancelling Subscriptions. If you purchased a subscription directly from Wedlock, you may cancel or change your Payment Method via the payment settings option under your profile. If you purchased a subscription through a Third-Party Store, such as the Apple App Store or the Google Play Store, you will need to access your account with that Third Party Store and follow instructions to change or cancel your subscription. If you cancel your subscription, you may use your subscription until the end of the period you last paid for, but (i) you will not (except as set forth in the subsection entitled “Refunds” below) be eligible for a prorated refund, (ii) your subscription will not be renewed when that period expires and (iii) you will then no longer be able to use the Premium Services or In-App Purchases enabled by your subscription.
    
                </p>
                <p className="pb-4">
                Because our Services may be utilised without a subscription, cancelling your subscription does not remove your profile from our Services. If you wish to fully terminate your account, you must terminate your account as set forth in Section 15.
    
                </p>
                <p className="pb-4">
                The Wedlock Global Services operates a global business, and our pricing varies by a number of factors. We frequently offer promotional rates - which can vary based on region, length of subscription, bundle size and more. We also regularly test new features and payment options. The Wedlock Global Services reserves the right, including without prior notice, to limit the available quantity of or discontinue making available any product, feature, service or other offering; to impose conditions on the honouring of any coupon, discount, offer or other promotion; to bar any user from making any transaction; and to refuse to provide any user with any product, service or other offering or to honour any offer.
                </p>
                <p className="pb-4">
                Free Trials. If you sign up for a free trial and do not cancel, your trial may convert into a paid subscription and your Payment Method will be charged at the then-current price for such subscription. Once your free trial converts to a paid subscription, your paid subscription will continue to automatically renew at the end of each period, and your Payment Method will be charged, until you cancel. To avoid charges for a new subscription period, you must cancel before the end of the then-current subscription period or free trial period as described above. Deleting your account or deleting the application from your device does not cancel your free trial. If you have signed up for a free trial on Wedlock through the Apple Store or Google Play Store previously, you will not be eligible for another free trial and you will then be automatically signed up to a subscription and charged as described in this paragraph.
                </p>
                <p className="pb-4 font-semibold">
                Refunds. Generally, all charges for purchases are non-refundable, and there are no refunds or credits for partially used periods.
    
                </p>
                <p className="font-semibold text-md">
                To request a refund:
                </p>
                <p className="pb-4">In addition to cancelling, eligible subscribers must request a refund to receive one. If you subscribed using your Apple ID, refunds are handled by Apple, not Wedlock. To request a refund, go to iTunes, click on your Apple ID, select “Purchase history,” find the transaction and hit “Report Problem”. You can also submit a request at Apple Support.
                </p>
                <p className="pb-4">For all other purchases: please contact customer support with your order number (you can find the order number in the order confirmation email, or if you purchased from the Google Play Store by logging in to Google Wallet). You may also mail or deliver a signed and dated notice which states that you, the buyer, are cancelling this agreement, or words of similar effect. Please also include the email address or mobile number associated with your account along with your order number. This notice shall be emailed to: info@wedlock.au.
                </p>
                <p className="pb-4">
                The payments required under this Section 5 do not include any Goods and Services Tax (GST) that may be due in connection with the subscription-based services provided under these Terms. If Wedlock determines it has a legal obligation to collect a GST from you in connection with these Terms, Wedlock will collect such GST in addition to the payments required under this Section 5. If any subscription-based services, or payments for any subscription-based services, under these Terms are subject to any GST in any jurisdiction and you have not remitted the applicable GST to Wedlock, you will be responsible for the payment of such GST and any related penalties or interest to the relevant tax authority. As used herein, “Goods and Services Tax” means any goods and sales or use tax and any other tax measured by goods and sales proceeds that is the functional equivalent of a GST where the applicable taxing jurisdiction does not otherwise impose a sales or use tax.
    
                </p>
                <h3 className="font-bold text-md">6. VIRTUAL ITEMS </h3>
                <p className="pb-4">At times, you may be able to purchase a limited, personal, non-transferable, non-sublicensable, revocable licence to access special limited-use features from Wedlock, referred to here as “Virtual Items”. You can only purchase Virtual Items through Wedlock or Wedlock’s partners. Virtual Items represent a limited license right governed by this Agreement, and, except as otherwise prohibited by applicable law, no title or ownership in or to Virtual Items is being transferred or assigned to you. This Agreement, and your purchase of Virtual Items, does not constitute the sale of any rights in Virtual Items.
                </p>
                <p className="pb-4">
                Any Virtual Item balance shown in your account does not constitute a real-world balance or reflect any stored value, but instead shows the extent of your licence to access Virtual Items. Virtual Items do not incur fees for non-use. Your licence in Virtual Items will terminate on the earlier of Wedlock ceasing provision of services or your account closing or terminating. Wedlock may also at times provide Virtual Items as bonuses to, or parts of, paid subscriptions for its services. Your ability to use Virtual Items you have access to in this manner may terminate at the end of each of your subscription periods and your access to Virtual Items may not “roll over” or accumulate through additional subscription periods. Your access to Virtual Items gained through subscriptions may also end if you cancel your subscription.
    Wedlock, in its sole discretion, reserves the right to charge fees for the right to access or use Virtual Items and/or may distribute Virtual Items with or without charge. Wedlock may manage, regulate, control, modify, or eliminate Virtual Items at any time, including taking actions that may impact the perceived value or purchase price, if applicable, of any Virtual Items and Wedlock shall have no liability to you for doing so. You shall not sell, redeem, or otherwise transfer Virtual Items to any person or entity. Virtual Items may only be redeemed through our Services.
    
                </p>
                <p className="pb-4">
                ALL PURCHASES AND REDEMPTIONS OF VIRTUAL ITEMS MADE THROUGH OUR SERVICES ARE FINAL AND NON-REFUNDABLE. YOU ACKNOWLEDGE THAT WEDLOCK IS NOT REQUIRED TO PROVIDE A REFUND FOR ANY REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER COMPENSATION FOR UNUSED VIRTUAL ITEMS WHEN AN ACCOUNT IS CLOSED, WHETHER SUCH CLOSURE WAS VOLUNTARY OR INVOLUNTARY.
                </p>
                <h3>7. PUSH NOTIFICATIONS; LOCATION-BASED FEATURES</h3>
                <p className="pb-4">We may provide you with emails, text messages, push notifications, alerts and other messages related to the App and/or the Wedlock services, such as enhancements, offers, products, events, and other promotions. After downloading the App, you may be asked to accept or deny push notifications/alerts. If you deny, you will not receive any push notifications/alerts. If you accept, push notifications/alerts will be automatically sent to you. If you no longer wish to receive push notifications/alerts from the App, you may opt out by changing your notification settings on your mobile device. With respect to other types of messaging or communications, such as emails, text messages, etc., you can unsubscribe or opt out by either following the specific instructions included in such communications.
                </p>
                <h3 className="font-bold text-md">8. DISCLAIMER </h3>
                <p className="pb-4">THE APP, Site, OUR CONTENT, AND MEMBER CONTENT ARE ALL PROVIDED TO YOU “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT. WITHOUT LIMITING THE FOREGOING, WE DO NOT GUARANTEE THE COMPATIBILITY OF ANY MATCHES.
                </p>
                <p className="pb-4">SHOULD APPLICABLE LAW NOT PERMIT THE FOREGOING EXCLUSION OF EXPRESS OR IMPLIED WARRANTIES, THEN WE GRANT THE MINIMUM EXPRESS OR IMPLIED WARRANTY REQUIRED BY APPLICABLE LAW. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, SHALL CREATE ANY WARRANTY, REPRESENTATION OR GUARANTEE NOT EXPRESSLY STATED IN THIS SECTION.
                </p>
                <p className="pb-4">
                ADDITIONALLY, WE DO NOT MAKE ANY WARRANTIES THAT THE APP OR Site WILL BE UNINTERRUPTED, SECURE OR ERROR FREE OR THAT YOUR USE OF THE APP OR Site WILL MEET YOUR EXPECTATIONS, OR THAT THE APP, Site, OUR CONTENT, ANY MEMBER CONTENT, OR ANY PORTION THEREOF, IS CORRECT, ACCURATE, OR RELIABLE. YOUR USE OF THE APP OR Site IS AT YOUR OWN RISK. YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER MEMBERS. THE WEDLOCK GLOBAL SERVICES IS NOT RESPONSIBLE FOR THE CONDUCT OF ANY USER. WEDLOCK GLOBAL SERVICES DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON ITS MEMBERS.
                </p>
                <h3 className="font-bold text-md">9. LIMITATION OF LIABILITY</h3>
                <p className="pb-4">NEITHER US NOR ANY OWNER WILL BE LIABLE FOR ANY DAMAGES, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE, INCLUDING, WITHOUT LIMITATION, LOSS OF DATA, INCOME, PROFIT OR GOODWILL, LOSS OF OR DAMAGE TO PROPERTY AND CLAIMS OF THIRD PARTIES ARISING OUT OF YOUR ACCESS TO OR USE OF THE APP, Site, OUR CONTENT, OR ANY MEMBER CONTENT, HOWEVER CAUSED, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), PROPRIETARY RIGHTS INFRINGEMENT, PRODUCT LIABILITY OR OTHERWISE.
                </p>
                <p className="pb-4">
                THE FOREGOING SHALL APPLY EVEN IF WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IF YOU BECOME DISSATISFIED IN ANY WAY WITH THE APP OR Site, YOUR SOLE AND EXCLUSIVE REMEDY IS TO STOP YOUR USE OF THE APP AND Site.
    YOU HEREBY WAIVE ANY AND ALL CLAIMS ARISING OUT OF YOUR USE OF THE APP OR Site. BECAUSE SOME STATES DO NOT ALLOW THE DISCLAIMER OF IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN TYPES OF DAMAGES, THESE PROVISIONS MAY NOT APPLY TO YOU. IF ANY PORTION OF THIS LIMITATION ON LIABILITY IS FOUND TO BE INVALID OR UNENFORCEABLE FOR ANY REASON, THEN OUR AGGREGATE LIABILITY SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100).
    
    
                </p>
                <p className="pb-4">
                THE LIMITATION OF LIABILITY HEREIN IS A FUNDAMENTAL ELEMENT OF THE BASIS OF THE BARGAIN AND REFLECTS A FAIR ALLOCATION OF RISK. THE APP AND Site WOULD NOT BE PROVIDED WITHOUT SUCH LIMITATIONS AND YOU AGREE THAT THE LIMITATIONS AND EXCLUSIONS OF LIABILITY, DISCLAIMERS AND EXCLUSIVE REMEDIES SPECIFIED HEREIN WILL SURVIVE EVEN IF FOUND TO HAVE FAILED IN THEIR ESSENTIAL PURPOSE. THE FOREGOING DOES NOT APPLY TO LIABILITY ARISING FROM ANY FRAUD OR FRAUDULENT MISREPRESENTATIONS, OR ANY OTHER LIABILITY THAT CANNOT BE LIMITED BY APPLICABLE LAW.
    
                </p>
                <h3 className="font-bold text-md">10. INDEMNITY</h3>
                <p className="pb-4">All the actions you make and information you post on Wedlock remain your responsibility. Therefore, you agree to indemnify, defend, release, and hold us, and our partners, licensors, affiliates, contractors, officers, directors, employees, representatives and agents, harmless, from and against any third-party claims, damages (actual and/or consequential), actions, proceedings, demands, losses, liabilities, costs and expenses (including reasonable legal fees) suffered or reasonably incurred by us arising as a result of, or in connection with:
                </p>
    
                <ul className="list-decimal pl-4 pb-4">
                  <li>any negligent acts, omissions or wilful misconduct by you; </li>
                  <li>your access to and use of the App or Site;
                  </li>
                  <li>the uploading or submission of Content to the App or Site by you;
                  </li>
                  <li>any breach of these Terms by you; and/or
                  </li>
                  <li>your violation of any law or of any rights of any third party.
                  </li>
                </ul>
                <p className="pb-4">We retain the exclusive right to settle, compromise and pay any and all claims or causes of action which are brought against us without your prior consent. If we ask, you will co-operate fully and reasonably as required by us in the defence of any relevant claim.
                </p>
    
                <p className="pb-4">
                The foregoing provision does not require you to indemnify Wedlock Global Services for any unconscionable commercial practice or any fraud, deception, false promise, 
                misrepresentation or concealment, suppression or omission of any material fact in connection with the App or Site
                </p>
    
                <h3 className="font-bold text-md">11. PROCEDURE FOR MAKING CLAIMS OF COPYRIGHT INFRINGEMENT
                </h3>
                <p className="pb-4">
                If you believe any content on Wedlock infringes the copyright in a work that you own, please submit a notification alleging such infringement to Wedlock Global Services. The Takedown Notice must include the following:
    
                </p>
    
                <ul className="list-decimal pl-4 pb-4">
                  <li>A physical or electronic signature of a person authorised to act on behalf of the owner of an exclusive right that is allegedly infringed;
                  </li>
                  <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online Site are covered by a single notification, a representative list of such works;
                  </li>
                  <li>Identification of the material claimed to be infringing or to be the subject of infringing activity and that is to be removed or access disabled and information reasonably sufficient to permit the service provider to locate the material;
                  </li>
                  <li>Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and, if available, an electronic mail;
                  </li>
                  <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorised by the copyright owner, its agent, or the law; and
                  </li>
                  <li>A statement that, under penalty of perjury, the information in the notification is accurate and you are authorised to act on behalf of the owner of the exclusive right that is allegedly infringed.
                  </li>
                </ul>
                <h3 className="font-bold text-md">
                12. THIRD PARTY APP STORE
    
                </h3>
                <p className="pb-4">
                The following additional terms and conditions apply to you if you download the App from a Third-Party Store. To the extent that the other terms and conditions of these Terms are less restrictive than, or otherwise conflict with, the terms and conditions of this Section, the more restrictive or conflicting terms and conditions in this Section will apply, but solely with respect to the App and the Third-Party Store. You acknowledge and agree that:
    
                </p>
    
                <ul className="list-decimal pl-4 space-y-4 pb-4">
                  <li>These Terms are concluded solely between you and the Wedlock Global Services and not with the providers of the Third-Party Store, and the Wedlock Global Services (and not the Third-Party Store providers) is solely responsible for the App and the content thereof. To the extent that these Terms provide for usage rules for the App which are less restrictive or in conflict with the applicable terms of service of the Third-Party Store from which you obtain the App, the more restrictive or conflicting term of the Third-Party Store will take precedence and will apply.
                  </li>
                  <li>The Third-Party Store provider has no obligation whatsoever to provide any maintenance and support services with respect to the App. The Wedlock Global Services is solely responsible for any product warranties, whether express or implied by law, to the extent not effectively disclaimed. The Third-Party Store provider will have no warranty obligation whatsoever with respect to the App, and any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be the sole responsibility of the Wedlock Global Services.
                  </li>
                  <li>The Wedlock Global Services, not the Third-Party Store provider, is responsible for addressing any claims you or any third party may have relating to the App or your possession and/or use of the App, including, but not limited to: (i) product liability claims; (ii) any claim that the App fails to conform to any applicable legal or regulatory requirement; (iii) claims arising under consumer protection or similar legislation; and/or (iv) intellectual property infringement claims.
                  </li>
                  <li>
                  The Third-Party Store provider and its subsidiaries are third party beneficiaries of these Terms, and, upon your acceptance of these Terms, the Third-Party Store provider from whom you obtained the App will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary thereof.
    
                  </li>
                </ul>
    
                <p className="pb-4" >
                In the event of a conflict between a Third-Party Store’s or mobile carrier’s applicable terms and conditions and these Terms, the terms and conditions of the Third-Party Store or mobile carrier shall govern and control. We are not responsible and have no liability whatsoever for third-party goods or services you obtain through a Third-Party Store or mobile carrier. We encourage you to make whatever investigation you feel necessary or appropriate before proceeding with any online transaction with any of these third parties.
                 </p>
    
                 <h3 className="font-bold text-md">13. DISPUTE RESOLUTION
                 </h3>
                 <p className="pb-4">Please read the following arbitration agreement in this Section (“Arbitration Agreement”) carefully. Unless you opt out in the manner described in Section 13(10) below, this Arbitration Agreement requires you and Wedlock Global Services to resolve disputes by binding arbitration instead of in court, and limits the manner in which we may seek relief from each other.
                 </p>
                 <ul className="list-decimal pl-4 space-y-4 pb-4">
                  <li >When Does This Arbitration Agreement Apply? This Arbitration Agreement applies to any disputes or claims of any kind whatsoever (whether based in contract, tort, statute, regulation, ordinance, fraud, misrepresentation or any other legal or equitable theory) between you and the Wedlock Global Services arising out of or relating to the Terms, prior versions of the Terms, your use of our App or Site, or any other aspect of your relationship with Wedlock, including claims or disputes arising (but not actually filed in arbitration) before the effective date of these Terms. It requires that, and by entering into these Terms you and Wedlock Global Services agree, that such disputes or claims will be resolved by binding arbitration, rather than in court, except that (i) you or Wedlock may assert individual claims in small claims court if your claims qualify; and (ii) you or Wedlock may seek equitable relief in court for infringement or misuse of intellectual property rights.
                  </li>
                  <li>Notice of Dispute and Informal Resolution. Before beginning the arbitration process, you and Wedlock Global Services agree to first notify one another of the dispute in writing at least 60 days in advance of initiating an arbitration. Notice to Wedlock Global Services must be sent by letter, and must provide your name, current email address, mailing address, and telephone number, as well as the name, email address, and telephone number associated with your Wedlock account (if different from your current information); and describe the nature of the claim and the specific relief being sought.
                  </li>
                  <p>You and Wedlock agree to meet and confer, via teleconference or videoconference, in a good faith effort to informally resolve any claim or dispute covered by this Arbitration Agreement. If either party is represented by counsel, that counsel may participate in the informal dispute resolution conference. During this process, you may be provided with an offer of judgment. A party defending against a claim may serve on an opposing party an offer to allow judgment on specified terms, with the costs then accrued. If the judgment that the offeree finally obtains is not more favourable than the unaccepted offer, the offeree must pay the costs incurred after the offer was made.
                  </p>
                  <p>All offers, promises, conduct, and statements made in the course of the informal dispute resolution process by any party, its agents, employees, and attorneys are confidential and not admissible for any purpose in any subsequent proceeding, provided that evidence that is otherwise admissible or discoverable shall not be rendered inadmissible or non-discoverable as a result of its use in the informal dispute resolution process.
                  </p>
                  <p>The informal dispute resolution conference shall occur within 60 days of receipt of the written notice described above, unless an extension is mutually agreed upon. If, after participating in that conference, the parties are unable to resolve the dispute, the claimant may commence an arbitration in accordance with this Agreement. Completion of this informal dispute resolution is a condition precedent to filing any demand for arbitration. Failure to do so is a breach of this Agreement, and no demand for arbitration shall be valid unless such written notice is provided and good faith discussions have been conducted.
                  </p>
                  <p>Any statute of limitations will be tolled while the parties engage in the informal dispute resolution process described in this section.
                  </p>
                  <li>
                  How Do You Start The Arbitration Process? If you and Wedlock Global Services are unable to resolve the dispute within 60 days, either party may proceed to file a claim for arbitration. To begin the arbitration process, you or Wedlock Global Services must submit notice by certified mail of the claim with an individualised arbitration demand. To be valid, the demand must contain the name of the claiming party (you or Wedlock Global Services), your or Wedlock Global Services mailing address, the email address or phone number associated with your Wedlock account (if applicable), and a detailed description of the dispute and the relief sought. Notice to Wedlock Global Services must be submitted.
    
                  </li>
                  <li>
                  What Are The Rules Of Arbitration? The initiating party must pay all filing fees for the arbitration. Your and Wedlock Global Services responsibility to pay other administrative and arbitrator costs will be as set forth in the applicable arbitration provider’s rules, unless the arbitrator determines the claims are frivolous. If a claim is determined to be frivolous, the claimant is responsible for reimbursing the respondent for its portion of all such administrative, hearing, and/or other fees incurred as a result of the frivolous claim.
                  You may qualify for a waiver of certain arbitration costs under the applicable arbitration provider’s rules or other applicable law
                  </li>
                  <li>
                  What Can The Arbitrator Decide? The arbitrator has the exclusive authority to resolve any and all threshold arbitrability issues, including whether this Arbitration Agreement is applicable, enforceable, or unconscionable. Courts, however, shall have the exclusive authority to determine (i) whether any provision of this Arbitration Agreement should be severed and the consequences of said severance, (ii) enforceability of any or all of the mass arbitration procedures set forth in Section 13(8), (iii) whether you have complied with conditions precedent to arbitration, and (iv) whether an arbitration provider is available to hear the arbitration(s) under Section 13(4). The arbitrator will have the authority to grant motions dispositive of all or part of any claim. The arbitrator will have the authority to award monetary damages and to grant any non-monetary remedy or relief available in an individual under applicable law, the arbitral forum’s rules, and the Terms (including the Arbitration Agreement). The arbitrator will issue a written award and statement of decision describing the essential findings and conclusions on which the award is based, including the calculation of any damages awarded. The arbitrator has the same authority to award relief that a judge in a court of law would have. The award of the arbitrator is final and binding upon you and us.
                  </li>
                  <li>
                  No Jury Trials. By agreeing to arbitration, YOU AND WEDLOCK ARE EACH AGREEING TO WAIVE THEIR RIGHTS TO A JURY TRIAL. Instead, you and Wedlock Global Services are electing that all claims and disputes will be resolved by arbitration under this Arbitration Agreement, except as described in Section 13(1) above. An arbitrator can award the same damages and relief as a court and must follow this Agreement as a court would. However, there is no judge or jury in arbitration, and court review of an arbitration award is subject to very limited review.
    
                  </li>
                  <li>
                   One At A Time. All claims and disputes within the scope of this Arbitration Agreement MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS OR COLLECTIVE BASIS, AND YOU AND WEDLOCK GLOBAL SERVICES GIVE UP YOUR RIGHTS TO PARTICIPATE IN A CLASS ACTION OR ANY OTHER CLASS PROCEEDING. However, this shall not preclude the use of bellwether arbitrations, global mediation, or batch arbitrations as described in Section 13(8) below, nor preclude the application of the arbitration provider’s fee schedules for mass arbitrations, as applicable. Only relief that would be permitted in an individual lawsuit is available, and claims of more than one customer or user cannot be arbitrated or consolidated with those of any other customer or user, except as provided in Section 13(8) below, nor shall this preclude application of the arbitration provider’s fee schedules for mass arbitrations, as applicable. The arbitration proceeding will not be consolidated with any other matters or joined with any other cases or parties , except as provided in Section 13(8) below, nor shall this preclude application of the arbitration provider’s fee schedules for mass arbitrations, as applicable.
    
                  </li>
                  <li>
                  Mass Filings. If, at any time, 30 or more similar demands for arbitration are asserted against Wedlock or related parties by the same or coordinated counsel or entities, or if Wedlock Global Services asserts 30 or more similar demands for arbitration or counterclaims against similarly-situated parties, within a period of 60 days or otherwise close in proximity (“Mass Filing”), the additional protocols set forth shall apply.
    
                  </li>
                  <li>
                  Offer of Judgment. At least 14 days before the date set for the arbitration hearing, any party may serve an offer in writing upon the other party to allow judgment on specified terms. If the offer made by one party is not accepted by the other party, and the other party fails to obtain a favorable award, the other party shall not recover any post-offer costs to which they otherwise would be entitled and shall pay the offering party’s costs from the time of the offer.
    
                  </li>
                  <li>
                   Opt-Out. Updates to Wedlock’s Terms do not provide a new opportunity for you to opt out of arbitration if you previously agreed to a prior version of Wedlock’s Terms containing an arbitration provision and did not validly opt out of arbitration.
    
                  </li>
                  <ul className="list-disc ">
                    <li>Previous or existing users. Users who previously agreed to arbitrate may reject this updated Arbitration Agreement by following the opt-out method below, but such users will still be bound by the most recent prior version of the Arbitration Agreement and will otherwise be bound by these Terms. Previous or existing users who do not opt out of this updated Arbitration Agreement will be bound by this Arbitration Agreement and it shall apply to all disputes between such users and Wedlock, including those arising (but not actually filed in arbitration) before the effective date of these Terms. Arbitration demands that have already been actually filed with an arbitration provider before the effective date of this Arbitration Agreement and in compliance with a prior version of this Arbitration Agreement are subject to the prior version’s terms.
                    </li>
                    <li>
                    Method and impact of opting out. Subject to the above, you may opt out of this Arbitration Agreement by sending written notice of your decision to opt out, within 31 days after first becoming subject to this Arbitration Agreement. Your notice must include your name, your Wedlock username (if any), the email address and/or phone number you used to set up your Wedlock account (if you have one), and an unequivocal statement that you want to opt out of this Arbitration Agreement. If you opt out of this Arbitration Agreement, all other parts of the Terms and any other agreements between you and Wedlock will continue to apply to you. Opting out of this Arbitration Agreement has no effect on any other arbitration agreements that you may currently have, or may enter in the future, with us.
    
                    </li>
                  </ul>
    
                  <li>
                  Severability. Except as provided in subsection 13(7), if any part or parts of this Arbitration Agreement are found under the law to be invalid or unenforceable, then such specific part or parts shall be of no force and effect and shall be severed and the remainder of the Arbitration Agreement shall continue in full force and effect. If a court decides that any of the provisions in the Arbitration Agreement above is invalid or unenforceable because it would prevent the exercise of a non-waivable right to pursue public injunctive relief, then any dispute regarding the entitlement to such relief (and only that relief) must be severed from arbitration and may be litigated in court. All other disputes subject to arbitration under the terms of the Arbitration Agreement shall be arbitrated under its terms.
    
                  </li>
                  <li>
                  Survival of Agreement. The terms of this Arbitration Agreement will continue, even after your relationship with Wedlock has ended.
    
                  </li>
    
                 </ul>
                 <h3 className="text-md font-bold">14. TERMINATION AND REMEDIES
                 </h3>
                 <p className="pb-4">These Terms commence on the date you accept them (as described in the preamble) and continue until terminated in accordance with the terms herein.
                 </p>
    
                 <p className="pb-4">In the event that Wedlock Global Services determines, in its sole discretion, that you have breached any portion of these Terms, have misused the App, or have otherwise demonstrated conduct which the Wedlock Global Services regards as inappropriate or unlawful (whether on or off the App), Wedlock Global Services reserves the right to: (a) warn you via email (to any email addresses you have provided to Wedlock Global Services) that you have violated the Terms; (b) delete your User Content; (c) discontinue your Account; (d) discontinue your subscription(s) without refund; (e) notify and/or send your User Content to and/or fully cooperate with the proper law enforcement authorities for further action; and/or (f) pursue to any other action which Wedlock Global Services deems to be appropriate. You agree that all terminations for cause shall be made in Wedlock Global Services’s sole discretion and that Wedlock Global Services shall not be liable to you or any third party for any termination of your Account.</p>
                
                <p className="pb-4">Termination of these Terms or your Account includes the removal of access to your Account, and all related information and content associated with or inside your Account.
    If your account is terminated by you or by the Wedlock Global Services for any reason, all provisions of these Terms which by their nature should survive, shall survive termination of these Terms, including, without limitation, the Arbitration Agreement, ownership provisions, warranty disclaimers and limitation of liability. Your information will be maintained and deleted in accordance with our Privacy Policy.
    </p>
    
    <h3 className="text-md font-bold">15. MISCELLANEOUS
    </h3>
      <p className="pb-4">There are a few more things we need to mention before you can use Wedlock.
    These Terms, which we may amend from time to time, constitute the entire agreement between you and the Wedlock Global Services. The Terms supersede all previous agreements, representations and arrangements between us (written or oral), excluding the Privacy Policy. Nothing in this clause shall limit or exclude any liability for fraudulent misrepresentation.
    </p>
    <p className="pb">
    The Wedlock Global Services has taken reasonable steps to ensure the currency, availability, correctness and completeness of the information contained on Wedlock and provides that information on an "as is", "as available" basis. The Wedlock Global Services does not give or make any warranty or representation of any kind about the information contained on Wedlock, whether express or implied. Use of Wedlock and the materials available on it is at your sole risk. The Wedlock Global Services is not responsible for any loss arising from the transmission, use of data, or inaccurate Member Content.
    
    </p>
    
    <p className="pb-4">
    You are responsible for taking all necessary precautions to ensure that any material you may obtain from Wedlock is free of viruses or other harmful components. You accept that Wedlock will not be provided uninterrupted or error free, that defects may not be corrected or that The Wedlock Global Services, or the server that makes it available, are free of viruses or bugs, spyware, Trojan horse or any similar malicious software. The Wedlock Global Services is not responsible for any damage to your computer hardware, computer software, or other equipment or technology including, but without limitation damage from any security breach or from any virus, bugs, tampering, fraud, error, omission, interruption, defect, delay in operation or transmission, computer line or network failure or any other technical or other malfunction.
    The communications between you and Wedlock Global Services may take place via electronic means, whether you use the App or send Wedlock Global Services emails, or whether Wedlock Global Services posts notices in the App, Site or communicates with you via email. For contractual purposes, you (a) consent to receive communications from Wedlock Global Services in electronic form; and (b) agree that all terms and conditions, agreements, notices, disclosures, and other communications that Wedlock Global Services provides to you electronically satisfy if it were to be in writing.
    </p>
    
    <h3 className="text-md font-bold">Changes to our Terms</h3>
    <p className="pb-4">As Wedlock grows, we might have to make changes to these Terms so we reserve the right to modify, amend or change the Terms at any time (a “Change”). If we do this then the Changes will be posted on this page and we will indicate the Effective Date of the updates at the bottom of the Terms. In certain circumstances, we may send an email to you notifying you of a Change. It’s also possible that we might ask you to agree to our Changes, but we’ll let you know. You should regularly check this page for notice of any Changes – we want our users to be as informed as possible.
    </p>
    
    <p className="pb-4">Your continued use of Wedlock following any Change constitutes your acceptance of the Change and you will be legally bound by the new updated Terms. If you do not accept any Changes to the Terms, you should stop using Wedlock immediately (uh oh, that’s going to be hard!).
    </p>
    
    <p className="pb-4">Additional items:
    </p>
    
    <p className="pb-4">
    If, for any reason, any of the Terms are declared illegal, invalid or otherwise unenforceable by a court of a competent jurisdiction, then to the extent that term is illegal, invalid or unenforceable, it shall be severed and deleted from the Terms and the remainder of the Terms shall survive, remain in full force and effect and continue to be binding and enforceable.
    
    </p>
    
    <p className="pb-4">
    No failure or delay in exercising any right, power or privilege under the Terms shall operate as a waiver of such right or acceptance of any variation of the Terms and nor shall any single or partial exercise by either party of any right, power or privilege preclude any further exercise of the right or the exercise of any other right, power or privilege.
    By using the App or Site, you agree and acknowledge that Wedlock is a global app or Site hosted on cloud service providers or through servers located overseas in a number of countries around the world, including the United States. If you live in a country with data protection laws, the storage of your personal data may not provide you with the same protections as you enjoy in your country of residence. By submitting your personal information, or by choosing to upgrade the services you use, or by making use of the applications available on Wedlock, you agree to the transfer of your personal information to, and storage and processing of your personal information in, any such countries and destinations.
    
    </p>
    
    <p className="pb-4">
    The App or Site may contain links to third-party websites or resources. In such cases, you acknowledge and agree that we are not responsible or liable for:
    
    </p>
    
    <ul className="list-decimal pl-4 pb-4">
      <li>the availability or accuracy of such websites or resources; or
      </li>
      <li>
      the content, products, or services on or available from such websites or resources.
    Links to such websites or resources do not imply any endorsement. You acknowledge sole responsibility for and assume all risk arising from your use of any such websites or resources. Framing, in-line linking or other methods of association with the App are expressly prohibited without first obtaining our prior written approval.
    
      </li>
    
    
    </ul>
    
    <p className="pb-4">These Terms, and any rights and licences granted hereunder, may not be transferred or assigned by you, but may be assigned by us without restriction.
    In the event there is a discrepancy between this English language version and any translated copies of the Terms, the English version shall prevail.
    </p>
    
    
    <h3 className="text-md font-bold">16. GOVERNING LAW AND FORUM.
    </h3>
    
    <p className="pb-4">Subject to Section 13(3) and any mandatory laws that may apply in the country in which you reside, your access to the App, Site, Our Content, and any Member Content, any claims arising from or related to your relationship with the Wedlock Global Services, and these Terms are governed and interpreted by the local laws.
    </p>
    
    <h3 className="text-md font-bold">17. WEDLOCK GLOBAL SERVICES.
    </h3>
    
    <p >The Terms constitute a binding legal agreement between you as user (“you”) and the Wedlock Global Services (“we” or “us”).
    </p>
    
    <p >Effective date
    </p>
    
    <p>The Terms were last updated on: 7th August, 2024.
    </p>
    
    
    
    
    
    
                
    
    
            </div>
          </div>
        </div>
      );
}

export default Terms
