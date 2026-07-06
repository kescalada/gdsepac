---
title: Meetings & Events
layout: base.njk
---

::: box card
Groton Dunstable SEPAC holds a variety of gatherings and presentations throughout the school year. All events are open to anyone, from any district, interested in the education of students with unique needs. Discussion topics relate to supporting parents of students receiving special education services in Groton and Dunstable, providing feedback to and gathering updates from Groton Dunstable Regional School District's Student Services administration and advising the district and School Committee on key issues important to our community. We strive to advocate for all students while maintaining the GD SEPAC as a strong volunteer-based organization.
:::

::: box card
## Types of Meetings

<dl class="defs">
  <dt>General Meetings</dt>
  <dd>Usually take place virtually and all members of GDRSD and the community are welcome.</dd>
  <dt>Informal Coffee and Dessert Events</dt>
  <dd>Generally happen monthly and all members of GDRSD and the larger community are welcome to attend.</dd>
  <dt>Leadership Meetings</dt>
  <dd>Considered internal and are comprised of SEPAC officers. These focus on current issues, planning for upcoming presentations, marketing, and general operational SEPAC needs.</dd>
  <dt>Meetings with GDRSD Administration</dt>
  <dd>Generally occur monthly, or as needed.</dd>
  <dt>Liaison Meetings</dt>
  <dd>Liaisons attend their assigned meetings, based on the schedule of their affiliated groups and then provide updates to membership during monthly meetings.</dd>
  <dt>MassPAC Workshops</dt>
  <dd>MassPAC workshop offerings are also available to members of the GDRSD community. These will also be emailed as part of the GDRSD Community Happenings newsletter.</dd>
</dl>
:::

::: box card upcoming
## Upcoming GD SEPAC Events

{% if events.length %}
<ul class="events">
{%- for e in events %}
<li class="event">
{%- if e.image %}
<figure class="event-media"><img src="{{ e.image.src }}" alt="{{ e.image.alt }}"></figure>
{%- endif %}
<div class="event-body">
<h3 class="event-title">{{ e.title }}</h3>
<p class="event-meta">{{ e.date }}{% if e.location %} &middot; {{ e.location }}{% endif %}</p>
{%- if e.description %}
<p>{{ e.description }}</p>
{%- endif %}
{%- if e.link %}
<p><a class="btn btn-outline" href="{{ e.link.url }}">{{ e.link.label }}</a></p>
{%- endif %}
</div>
</li>
{%- endfor %}
</ul>
{% else %}
<p class="muted">No events at the moment.</p>
{% endif %}
:::

::: box card upcoming
## Upcoming MassPAC Workshops

MassPAC workshop offerings are available to members of the GDRSD community. View the current schedule on the [FCSN events calendar](https://fcsn.org/calendar/).

<p><a class="btn btn-outline" href="https://fcsn.org/calendar/" target="_blank" rel="noopener">View MassPAC Workshops</a></p>
:::
