---
layout: compress
---
{% assign month_slides = '' | split: '|' %}
{% assign total_slides = site.data.dates.total_slides %}
{% assign total_days = site.data.dates.unix_day | times: total_slides %}
{% assign start_date = '2016-07-20 12:00:00 -05:00' | date: '%s' %}
{% assign end_date = '2016-08-31 12:00:00 -05:00' | date: '%s' %}
{% assign start_date = start_date | minus: total_days | downcase %}
dutchartdailyslides({
  "total": {{ site.data.dates.total_slides }},
  "posts": {
  {% for slide in site.slides %}
    {% assign slide_date = slide.date | date: '%s' %}
      {% if slide_date >= start_date and slide_date <= end_date %}
        {% assign month_slides = month_slides | push: slide %}
      {% endif %}
  {% endfor %}
  {% for slide in month_slides  %}
    {{ slide.date | date: '%m-%d' | jsonify }}: {{ slide.output | jsonify }}
    {% if forloop.rindex0 > 0 %},{% endif %}
  {% endfor %}
  }
});
