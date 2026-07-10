---
title: About Us & Contact
layout: base.njk
---

::: box card
## Get to Know Us

The Groton Dunstable Special Education Parent Advisory Council (GD SEPAC) is an all-volunteer organization of parents of exceptional children with unique needs in preschool, elementary school, middle school, high school, homeschool, and in private schools. Our mission is to support families in the community who wish to learn more about special education programs, issues, policies, regulations, and resources.

GD SEPAC serves as a liaison between parents of students with unique needs and school district administrators. We offer information to the community on a range of disabilities, resources, remediation approaches, and education issues. Topics presented at our monthly meetings include parents' rights under special education laws and regulations, effective collaboration with teachers and administrators, and strategies for parenting and teaching children with a range of needs. Meetings are open to all parents, teachers, specialists, and others with an interest in education.

We hold monthly meetings, workshops, and host morning coffee and evening dessert meetups. The governing members collaborate regularly with district administration and the school committee regarding our childrens' right to a free and appropriate public education with dignity.

Liaisons to the SEPAC are in place for each Groton and Dunstable public school, as well as for the School Committee and the DEI Advisory Group.

You can read more about how we are organized in our by-laws:

<p><a class="btn" href="{{ site.BYLAWS_PDF }}">Download our By-Laws (PDF)</a></p>

The formation of this SEPAC is mandated by the Massachusetts special education regulations:

<blockquote class="reg-quote"><p>Each school district shall create a district wide parent advisory council offering membership to all parents of eligible students and other interested parties. The parent advisory council duties shall include but not be limited to: advising the district on matters that pertain to the education and safety of students with disabilities; meeting regularly with school officials to participate in the planning, development, and evaluation of the school district's special education programs. The parent advisory council shall establish by-laws regarding officers and operational procedures, and, in the course of its duties, the parent advisory council shall receive assistance from the district without charge, upon reasonable notice, and subject to the availability of staff and resources.</p><p class="reg-cite">&mdash; <a href="https://www.doe.mass.edu/lawsregs/603cmr28.html?section=07">603 CMR 28.07(4)</a>, Massachusetts Department of Elementary and Secondary Education</p></blockquote>

The regulations also provide for an annual workshop on the rights of students and their families:

<blockquote class="reg-quote"><p>The district shall conduct, in cooperation with the parent advisory council, at least one workshop annually within the school district on the rights of students and their parents and guardians under state and federal special education laws.</p><p class="reg-cite">&mdash; <a href="https://www.doe.mass.edu/lawsregs/603cmr28.html?section=03">603 CMR 28.03(1)(a)(4)</a>, Massachusetts Department of Elementary and Secondary Education</p></blockquote>
:::

::: box card #contact
## Contact Information

Currently, the best way to reach SEPAC is via email:

<p><a class="btn" href="{{ ('mailto:' + site.EMAIL) | obfuscateEmail | safe }}">Email {{ site.EMAIL | obfuscateEmail | safe }}</a></p>
:::

::: box card
## Board of Directors

<ul class="people">
{%- for p in people.board %}
<li><span class="role">{{ p.role }}</span> {{ p.name }}</li>
{%- endfor %}
</ul>
:::

::: box card
## School Liaisons

Each Groton-Dunstable school has one or more SEPAC Liaison(s) who serve as school-based parent contact(s), send communications and announcements to school communities, and organize events and gatherings that support families with students who have IEPs, 504s, or children with disabilities.

<ul class="people">
{%- for p in people.liaisons %}
<li><span class="role">{{ p.role }}</span> {{ p.name }}</li>
{%- endfor %}
</ul>
:::

::: box card
## District Information

Please see the [Groton Dunstable Regional School District]({{ site.DISTRICT }}) web site for specific information related to Student Services and Special Education in the towns of Dunstable and Groton, Massachusetts.
:::

::: box card
## Social Media

<p><a class="btn btn-outline" href="{{ site.FACEBOOK }}" target="_blank" rel="noopener">Join us on Facebook</a></p>
:::
