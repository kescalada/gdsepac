// Site content for the GD SEPAC static site.
// Prose is transcribed from the original gdsepac.com (Wix) site.

const EMAIL = "GDSEPAC2@gmail.com";
const FACEBOOK = "https://www.facebook.com/groups/443095813186453";
const DISTRICT = "https://www.gdrsd.org/page/pupil-services";

// Navigation: [label, file]
const NAV = [
  ["Home", "index.html"],
  ["About Us & Contact", "about-us-contact.html"],
  ["Meetings & Events", "meetings-events.html"],
  ["About Disability", "about-disability.html"],
  ["Understanding the Process", "understanding-the-process.html"],
  ["Helpful Organizations", "helpful-organizations.html"],
  ["State and Federal Guidance", "state-and-federal-guidance.html"],
  ["Advocacy", "advocacy.html"],
  ["By-Laws", "by-laws.html"],
];

// Prose pages (hand-authored HTML body).
const PAGES = {
  "index.html": {
    title: "Home",
    hero: true,
    body: `
      <section class="card">
        <h2>What is a SEPAC?</h2>
        <p>The Groton Dunstable Special Education Parent Advisory Council (GD SEPAC) is an
        all-volunteer group of parents of exceptional children with unique needs in Groton and
        Dunstable, MA. As mandated by Massachusetts law, we provide feedback to the School
        Committee and school district on special education programs and policies, as well as
        provide feedback in their planning and development. Currently, the GD SEPAC has a
        non-voting seat on the School Committee and a seat on the School Committee's DEI
        Advisory Group.</p>
      </section>

      <section class="card contact-cta">
        <h2>Contact Us</h2>
        <p>The best way to reach us is by email.</p>
        <p><a class="btn" href="mailto:${EMAIL}">Email ${EMAIL}</a></p>
        <p>You can also <a href="${FACEBOOK}" target="_blank" rel="noopener">join us on Facebook</a>.</p>
      </section>

      <section class="quicklinks">
        <h2>Explore</h2>
        <div class="quicklink-grid">
          <a href="about-us-contact.html"><strong>About Us &amp; Contact</strong><span>Who we are, our officers, and liaisons.</span></a>
          <a href="meetings-events.html"><strong>Meetings &amp; Events</strong><span>Gatherings and presentations throughout the year.</span></a>
          <a href="understanding-the-process.html"><strong>Understanding the Process</strong><span>IEPs, 504s, evaluations, eligibility, and more.</span></a>
          <a href="about-disability.html"><strong>About Disability</strong><span>Learn from the disabled community.</span></a>
          <a href="helpful-organizations.html"><strong>Helpful Organizations</strong><span>National and local support organizations.</span></a>
          <a href="advocacy.html"><strong>Advocacy</strong><span>Take action in the best interest of children.</span></a>
        </div>
      </section>
    `,
  },

  "about-us-contact.html": {
    title: "About Us & Contact",
    body: `
      <section class="card">
        <h2>Get to Know Us</h2>
        <p>The Groton Dunstable Special Education Parent Advisory Council (GD SEPAC) is an
        all-volunteer organization of parents of exceptional children with unique needs in
        preschool, elementary school, middle school, high school, homeschool, and in private
        schools. Our mission is to support families in the community who wish to learn more about
        special education programs, issues, policies, regulations, and resources.</p>

        <p>GD SEPAC serves as a liaison between parents of students with unique needs and school
        district administrators. We offer information to the community on a range of disabilities,
        resources, remediation approaches, and education issues. Topics presented at our monthly
        meetings include parents' rights under special education laws and regulations, effective
        collaboration with teachers and administrators, and strategies for parenting and teaching
        children with a range of needs. Meetings are open to all parents, teachers, specialists,
        and others with an interest in education.</p>

        <p>We hold monthly meetings, workshops, and host morning coffee and evening dessert
        meetups. The governing members collaborate regularly with district administration and the
        school committee regarding our childrens' right to a free and appropriate public education
        with dignity.</p>

        <p>Liaisons to the SEPAC are in place for each Groton and Dunstable public school, as well
        as for the School Committee and the DEI Advisory Group.</p>

        <p>You can read more about how we are organized in our <a href="by-laws.html">by-laws</a>.</p>

        <p class="fineprint">The formation of this SEPAC is mandated by the Massachusetts
        Department of Elementary and Secondary Education: 603 CMR 28.07 (4) Parent Involvement:
        (4) Parent Advisory participation. Each school district shall create a district wide parent
        advisory council offering membership to all parents of eligible students and other
        interested parties. The parent advisory council duties shall include but not be limited to:
        advising the district on matters that pertain to the education and safety of students with
        disabilities; meeting regularly with school officials to participate in the planning,
        development, and evaluation of the school district's special education programs. The parent
        advisory council shall establish by-laws regarding officers and operational procedures, and,
        in the course of its duties, the parent advisory council shall receive assistance from the
        district without charge, upon reasonable notice, and subject to the availability of staff and
        resources. The district shall conduct, in cooperation with the parent advisory council, at
        least one workshop annually within the school district on the rights of students and their
        parents and guardians under state and federal special education laws. (See MGL c71B, 1C and 3)</p>
      </section>

      <section class="card" id="contact">
        <h2>Contact Information</h2>
        <p>Currently, the best way to reach SEPAC is via email:</p>
        <p><a class="btn" href="mailto:${EMAIL}">Email ${EMAIL}</a></p>
      </section>

      <section class="card">
        <h2>Officers</h2>
        <ul class="people">
          <li><span class="role">Co-Chair</span> Lori Saafi</li>
          <li><span class="role">Co-Chair</span> Kristyn MacInnis</li>
          <li><span class="role">Secretary</span> Maryellen Michelson</li>
          <li><span class="role">Treasurer</span> Katie Cobb Leonard</li>
        </ul>
      </section>

      <section class="card">
        <h2>School Liaisons</h2>
        <p>Each Groton-Dunstable school has one or more SEPAC Liaison(s) who serve as school-based
        parent contact(s), send communications and announcements to school communities, and
        organize events and gatherings that support families with students who have IEPs, 504s, or
        children with disabilities.</p>
        <ul class="people">
          <li><span class="role">Boutwell</span> position currently open</li>
          <li><span class="role">Florence Roche</span> Jen Mertes</li>
          <li><span class="role">Swallow Union</span> Kelley Escalada</li>
          <li><span class="role">GD Middle School</span> Kristyn MacInnis</li>
          <li><span class="role">GD High School</span> Katie Cobb Leonard</li>
        </ul>
      </section>

      <section class="card">
        <h2>District and Community Liaisons</h2>
        <p>SEPAC is invested in the communities of Groton and Dunstable and has liaisons who serve
        as community-based parent contacts that send communications and announcements to our
        communities and speak out for families and disabled children.</p>
        <ul class="people">
          <li><span class="role">School Committee</span> Jolie Reijnders</li>
          <li><span class="role">DEI Advisory</span> Kelley Escalada</li>
        </ul>
      </section>

      <section class="card">
        <h2>District Information</h2>
        <p>Please see the <a href="${DISTRICT}" target="_blank" rel="noopener">Groton Dunstable
        Regional School District</a> web site for specific information related to Student Services
        and Special Education in the towns of Dunstable and Groton, Massachusetts.</p>
      </section>

      <section class="card">
        <h2>Social Media</h2>
        <p><a class="btn btn-outline" href="${FACEBOOK}" target="_blank" rel="noopener">Join us on Facebook</a></p>
      </section>
    `,
  },

  "meetings-events.html": {
    title: "Meetings & Events",
    body: `
      <section class="card">
        <p>Groton Dunstable SEPAC holds a variety of gatherings and presentations throughout the
        school year. All events are open to anyone, from any district, interested in the education
        of students with unique needs. Discussion topics relate to supporting parents of students
        receiving special education services in Groton and Dunstable, providing feedback to and
        gathering updates from Groton Dunstable Regional School District's Student Services
        administration and advising the district and School Committee on key issues important to
        our community. We strive to advocate for all students while maintaining the GD SEPAC as a
        strong volunteer-based organization.</p>
      </section>

      <section class="card">
        <h2>Types of Meetings</h2>
        <dl class="defs">
          <dt>General Meetings</dt>
          <dd>Usually take place virtually and all members of GDRSD and the community are welcome.</dd>
          <dt>Informal Coffee and Dessert Events</dt>
          <dd>Generally happen monthly and all members of GDRSD and the larger community are welcome to attend.</dd>
          <dt>Leadership Meetings</dt>
          <dd>Considered internal and are comprised of SEPAC officers. These focus on current issues,
          planning for upcoming presentations, marketing, and general operational SEPAC needs.</dd>
          <dt>Meetings with GDRSD Administration</dt>
          <dd>Generally occur monthly, or as needed.</dd>
          <dt>Liaison Meetings</dt>
          <dd>Liaisons attend their assigned meetings, based on the schedule of their affiliated groups,
          and then provide updates to membership during monthly meetings.</dd>
        </dl>
      </section>

      <section class="card upcoming">
        <h2>Upcoming Events</h2>
        <p class="muted">No events at the moment. Please check back, or
        <a href="mailto:${EMAIL}">email us</a> to be notified.</p>
      </section>
    `,
  },
};

// Directory (link-list) pages: intro HTML + sections pulled from links.json.
// skip = heading texts in links.json to omit (page titles / intro headings).
const DIRECTORY = {
  "about-disability.html": {
    title: "About Disability",
    skip: ["Learning About Disability"],
    intro: `
      <h2>Learning About Disability</h2>
      <p>Disability is as varied and unique as the disabled person. As the saying goes, "If you've
      met one autistic person, you've met ONE autistic person." Part of the mission of GD SEPAC is
      to educate the community about disability. On this page, we present a number of resources to
      learn more about living with specific disabilities. We've especially focused on resources
      created by members of the disabled community.</p>
      <p>We are not fans of disability simulators as they rely on generalizations and stereotypes of
      disability. They tend to evoke pity due to the amplification of the negative traits of
      disability without acknowledging the adaptations one makes to navigate life in a neurotypical
      or able-bodied world.</p>
      <p>We ask you to start your education about disability with this video:
      <a href="https://youtu.be/gscAjUlKc7Y" target="_blank" rel="noopener">Normalizing Disability
      Begins in School</a>.</p>
    `,
  },
  "understanding-the-process.html": {
    title: "Understanding the Process",
    skip: ["Understanding the Process"],
    intro: `<p>Everything from eligibility and assessments to meetings and documentation.</p>`,
  },
  "helpful-organizations.html": {
    title: "Helpful Organizations",
    skip: ["Helpful Organizations"],
    intro: `<p>National, state, and local organizations that support families and individuals across
    a range of disabilities and needs.</p>`,
  },
  "state-and-federal-guidance.html": {
    title: "State and Federal Guidance",
    skip: ["State and Federal Guidance", "Federal and State Laws, Local Policy"],
    intro: `
      <p>Federal laws are the lowest bar of protection for your student. State law can only
      strengthen the protections of the federal law and never weaken it. Local policies and
      procedures, like state law, can only serve to further your student's rights but can not
      contradict state or federal law.</p>
      <p>Any child with a disability is protected by both the ADA and Section 504 (where the standard
      of FAPE is higher than IDEA) regardless of the district providing your child services,
      supports, or accommodations. In other words, if you inform the district that your student has
      a disability, the district is required to guarantee their rights under ADA and Section 504. No
      evaluation, IEP, or 504 plan needed. However, any child with a disability or suspected of
      having a disability is required to be identified and assessed under Child Find.</p>
    `,
  },
  "advocacy.html": {
    title: "Advocacy",
    skip: ["Advocacy"],
    intro: `<p>Resources to take action and collaborate in the best interest of children.</p>`,
  },
};

module.exports = { EMAIL, FACEBOOK, DISTRICT, NAV, PAGES, DIRECTORY };
