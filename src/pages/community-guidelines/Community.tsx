import Nav from "../../components/Legal/Nav";


const Community = () => {
 
  const currentDate = new Date().toDateString();
  return (
    <div className="flex flex-col mt-20">
      <div className="bg-[#E6F2F7] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#007EAF] font-semibold text-base">
          Current as of {currentDate.toLocaleString()}
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">Wedlock Community Guidelines</h1>
        <p className="text-[#475467] text-md md:text-xl text-balance">
        To ensure a positive experience for everyone, we ask that all users adhere to our Community Guidelines. These guidelines are here to promote respect, <br /> integrity, and inclusivity on the platform and to protect the safety and privacy of all members.

        </p>
      </div>
      <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
        <div className="">
          <Nav activeSectionData={"Community Guidelines"} />
        </div>
        <div className=" flex flex-col items-start md:pr-10">
          <h2 className="font-bold text-xl pb-4 "> Community Guidelines</h2>
          <h3 className="font-bold text-md">Wedlock Community Guidelines</h3>

          <p className="#475467 pb-4">
            Wedlock is a space to make kind connections in a safe, inclusive,
            and respectful way. In order to foster healthy and equitable
            relationships for matrimonial purpose, we hold our members
            accountable for the way they treat each other.
          </p>

          <p className="pb-4">
            Our Community Guidelines help keep our members safe. They make it
            clear what content and conduct is not acceptable (on our platform
            and off).
          </p>

          <h3 className="font-bold text-md">Profile Guidelines</h3>
          <ul className="list-disc pl-4">
            <li className="pb-4">
              Age. You need to be at least 18 years old to join Wedlock.
              Creating a profile that intentionally misrepresents you as being
              under the age of 18 is not allowed. We reserve the right to ask
              for your ID to verify your age, and we’ll block you from the
              platform if you’re underage.
            </li>
            <li>
              Profile Photos. We want your profile to celebrate your authentic
              self! That’s why we require at least one of your profile photos to
              depict only you and to clearly show your full face. We do not
              permit:
            </li>
            <li>
              Profile photos that are heavily distorted or contain exaggerated
              or unnatural digital effects to the point where it cannot be
              clearly determined that you’re the person in the photos
            </li>
            <li>
              Any overlaid symbols, icons, frames, or stickers that aren’t from
              Wedlock on your profile photos
            </li>
            <li>
              Memes or photos with only — or primarily — text as a profile photo
            </li>
            <li>Profile photos of children on their own</li>
            <li>Profile photos with unclothed children</li>
            <li>
              Username. Members are allowed to use initials, abbreviations,
              contracted or shortened versions of their name, nicknames, full
              names, and middle names. Members do not have to use their legal
              name or full name, but usernames should be an authentic
              representation of the name you use in everyday life. We do not
              permit
            </li>
            <li>Any words or phrases that violate our Community Guidelines</li>
            <li>Using the name of a celebrity or fictional character</li>
            <li className="pb-4">
              Words or characters (other than a valid name) including
              descriptive words, symbols (e.g. $, *, @,), emojis, numbers, or
              punctuation
            </li>
          </ul>
          <h2 className="font-bold text-md">Content and Conduct Guidelines</h2>
          <h3 className="font-bold text-md">Adult Nudity and Sexual Activity</h3>
          <p className="pb-4">
            We don’t permit nude, sexually
            explicit, or sexually vulgar profile content. We also don’t allow
            the commercial exchange of any romantic or sexual activity, content,
            or services, including attempts to sell, advertise, or buy adult
            sexual content.
          </p>

          <h3 className="font-bold text-md">Bullying and Abusive Conduct</h3>
          <p className="pb-4">
             Our community is for creating kind
            connections. We don’t allow content or behaviour that makes any
            individual or group feel harassed, bullied, or targeted. This
            includes belittling, insulting, or intimidating behaviour; making
            unsolicited comments about someone’s appearance; engaging in
            emotional abuse; blackmail; repeated unwanted contact; or wishing,
            encouraging, or praising acts of violence.
          </p>
          <h3 className="font-bold text-md">Child Sexual Exploitation and Abuse</h3>
          <p className="pb-4">
             We have a zero tolerance towards
            any form of child sexual exploitation and abuse. We don’t allow
            content that sexualises or endangers children, real or fictional
            (e.g. anime, media, text, illustrations, or digital images). This
            includes any visual depictions or discussions of sexually explicit
            conduct involving a child. For the purposes of this policy, a child
            is anyone under the age of 18. It’s prohibited to upload, store,
            produce, share, or entice anyone to share child sexual abuse
            material, even if the intent is to express outrage or raise
            awareness about this issue.
          </p>

          <h3 className="font-bold text-md">Commercial and Promotional Activity
          </h3>
          <p className="pb-4">
          Our platform is not a
            marketplace. We don’t allow using Wedlock for unsolicited commercial
            or promotional purposes.
          </p>

          <h3 className="font-bold text-md"> Controlled Goods and Substances</h3>
          <p>
            We don’t allow members to use our
            platforms to buy, sell, supply, distribute, or directly facilitate
            the purchase, sale, supply, or distribution of illegal drugs and/or
            the misuse of controlled goods and substances. This includes:
            e-cigarettes, marijuana, drug paraphernalia, or the misuse of legal
            substances like prescription drugs, tobacco, or alcohol.
          </p>

          <h3 className="font-bold text-md"> Dangerous Organisations and Individuals</h3>
          <p className="pb-4">
            We don’t permit
            organisations or individuals that proclaim, glorify, condone, or are
            known to support a violent, dangerous, or terrorist-based mission to
            have a presence on Wedlock.
          </p>

          <h3 className="font-bold text-md">Identity-Based Hate</h3>
          <p className="pb-4">
          We aim to foster a diverse and inclusive community on Wedlock. We prohibit content or behaviour that promotes or condones hate, dehumanisation, degradation, or contempt against marginalised or minoritised communities based on the following protected attributes: race/ethnicity, national origin/nationality/immigration status, caste, sex, gender identity or expression, sexual orientation, disability or serious health condition, or religion/belief. 

          </p>
          <h3 className="font-bold text-md">Inauthentic Profiles </h3>
          <p className="pb-4">
            Wedlock celebrates authenticity, and we expect
            all our members to represent themselves accurately on their profile.
            We don’t allow impersonation or misrepresentation on our platform.
            This includes catfishing (i.e. creating an online persona that isn’t
            you) or falsely stating facts about yourself (including name,
            gender, age, and permanent location).
          </p>
          <h3 className="font-bold text-md">Misinformation</h3>
          <p className="pb-4">
            Misinformation We prohibit the sharing of demonstrably false or
            substantially misleading content that’s likely to cause serious harm
            or negatively impact individual or public safety. This includes
            content that directly contradicts information and guidance from
            leading and reputable global health organisations and public health
            authorities, false or misleading information on any civic process,
            and dangerous and unproven conspiracy-type theories.
          </p>
          <h3 className="font-bold text-md">Physical and Sexual Violence </h3>
          <p className="pb-4">
             We don’t tolerate any content, imagery,
            or behaviour that commits or threatens credible acts of physical or
            sexual violence. This includes physical stalking, using our platform
            to assist, facilitate or support exploitation or human trafficking,
            and sexual assault of any kind, which we define as unwanted physical
            contact or attempted physical contact that is sexual in nature.
          </p>

          <h3 className="font-bold text-md">Scam and Theft</h3>
          <p className="pb-4">
             Wedlock prohibits any scam or theft activity
            intended to defraud or manipulate members out of financial or
            material resources. This includes requesting or seeking financial
            support, lying about your intentions for financial gain, or faking
            romantic intentions to deceive members out of financial or material
            resources.
          </p>

          <h3 className="font-bold text-md">Sexual Harassment</h3>
          <p className="pb-4">
            We do not tolerate sexual harassment. We consider
            sexual harassment to be any non-physical, unwanted, and unwelcome
            sexual behaviours between members. This includes cyberflashing (i.e.
            sharing unsolicited sexually explicit images), in-person indecent
            exposure, sharing or threatening to share sexual or intimate images
            without the consent of the person involved or depicted, sending
            unwanted sexual comments or images, and fetishisation.
          </p>

          <h3 className="font-bold text-md">Spam</h3>
          <p className="pb-4">
            sent in bulk or high frequency. This includes sharing misleading or
            misdirecting links, creating an excessive number of accounts causing
            disruption to other members, or having multiple active profiles on
            our platform to engage in unwanted interactions.
          </p>

          <h3 className="font-bold text-md">Suicide and Self-Injury Promotion</h3>      
          <p className="pb-4">
            Suicide and Self-Injury Promotion We care deeply about our members
            and understand that some may struggle with mental health,
            self-injury, suicidal thoughts, substance use, or eating disorders.
            While we do allow members to share personal experiences with these
            issues in a safe way, we don’t allow any content that depicts,
            promotes, glorifies, or assists in activities that could lead to
            suicide, self-injury, or disordered eating or body image.
          </p>

          <h3 className="font-bold text-md">Violent or Graphic Content</h3>
          <p className="pb-4">
            We don’t permit violent, graphic, or
            gory content. This includes descriptions of violence in usernames or
            profile content, photos containing real or realistic-appearing
            blood, bodily fluids, or injury, or images depicting guns of any
            kind (except on a uniformed member of law enforcement or military
            personnel).
          </p>
          <h3 className="text-md font-bold">Platform Manipulation</h3>
          <p className="pb-4">
            We prioritise fostering a community built on genuine connections, so
            any attempts to artificially influence connections, matching,
            conversations, or engagement through the use of automation or
            scripting is strictly prohibited.
          </p>
          <h3 className="text-md font-bold">Safety Reporting
          </h3>
          <p className="pb-4">
            Safety is a top priority at Wedlock. We use a combination of human
            moderators and automated systems to monitor and review Wedlock
            accounts and interactions for content that may be against our
            Community Guidelines, against our Terms and Conditions, or otherwise
            harmful. 
          </p>
          <p className="pb-4">Our members play a critical role in the safety of Wedlock
            by reporting content or behavior that may violate our Community
            Guidelines. If anything happens that makes you feel uncomfortable or
            unsafe, we highly encourage you to Unmatch with the member.</p>
          <p className="pb-4">
          However, please consider that disagreeing with or disliking a member or their content is not necessarily a reason to report them. We may take action against a member if we’e found them to be intentionally creating false or inappropriate reports against other members solely based on their protected attributes. This includes reporting transgender or nonbinary members for no reason other than their gender identity or expression or repeatedly sending false reports of bad behaviour.
          </p>
          <h3 className="text-md font-bold">Enforcement Philosophy</h3>
          <p className="pb-4">All members must comply with the platform rules described and referenced in our Community Guidelines. If you behave in a way that goes against Wedlock’s Community Guidelines, values, or otherwise act in any way we believe to be potentially harmful to Wedlock or its members, we may take a range of actions on your account. When determining the penalty for violating our community guidelines, we consider a number of factors.</p>
          <p>For example, we may:</p>
          <ul className="list-disc pl-10">
            <li>Remove the content</li>
            <li>Issue a warning</li>
            <li>Ban the offending member from some or all Wedlock Inc. apps</li>

            </ul>
            <p className="pb-4">When necessary, we also may cooperate with law enforcement to assist in potential criminal investigations related to member conduct.</p>
            <p className="pb-4">Your treatment towards others outside of the Wedlock app can also result in action against your account. If we’re made aware of harm between members on dates, meetups with friends, via text message or direct messaging platforms, or relevant alleged criminal or harmful conduct committed in your past or outside of Wedlock, we may take action as if it happened on our platform.</p>
            <p className="pb-4">If you believe we’ve made a mistake in taking action on your account or content, you can always contact us here</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
