---
layout: compress
sitemap:
  exclude: true
---
{% assign widths = site.data.srcset.widths %}
{% assign srcset_sizes = site.data.srcset.sizes %}
{% assign month_slides = '' | split: '|' %}
{% assign total_slides = site.data.dates.total_slides %}
{% assign total_days = site.data.dates.unix_day | times: total_slides %}
{% assign total_days = site.data.dates.unix_day | times: total_slides %}
{% assign end_date = '2016-12-31 12:00:00 -05:00' | date: '%s' %}
{% assign start_date = end_date | date: '%s' | minus: total_days | downcase %}

dutchartdailyslides({
  "total": {{ total_slides }},
  "posts": {
  {% for slide in site.slides %}
    {% assign slide_date = slide.date | date: '%s' %}
      {% if slide_date >= start_date and slide_date <= end_date %}
        {% assign month_slides = month_slides | push: slide %}
      {% endif %}
  {% endfor %}
  {% assign start_date = '2016-01-01 12:00:00 -05:00' | date: '%s' %}
  {% assign end_date = '2016-01-31 12:00:00 -05:00' | date: '%s' %}
  {% for slide in site.slides %}
    {% assign slide_date = slide.date | date: '%s' %}
      {% if slide_date >= start_date and slide_date <= end_date %}
        {% assign month_slides = month_slides | push: slide %}
      {% endif %}
  {% endfor %}
  {% for slide in month_slides  %}
  {{ slide.date | date: '%m-%d' | jsonify }}:
  {
    "id": {{ slide.date | date: '%m-%d' | jsonify }},
    "url": {{ slide.url | jsonify }},
    "title": {{ slide.title | jsonify }},
    "artist": {{ slide.artist | jsonify }},
    "date": {{ slide.date | date: '%B %-d' | jsonify }},
    "date_ordinal": {{ slide.date | date_to_string | ordinal | jsonify }},
    "image": {{ slide.image | replace: '.jpg', '--tiny.jpg' | jsonify }},
    "srcset": {{ srcset | jsonify }},
    "srcset_sizes": {{ srcset_sizes | jsonify }},
    "art_date": {{ slide.art_date | replace: '-', '&ndash;' | jsonify }},
    "art_medium": {{ slide.art_medium | jsonify }},
    "art_surface": {{ slide.art_surface | jsonify }},
    "art_height": {{ slide.art_height | jsonify }},
    "art_width": {{ slide.art_width | jsonify }},
    "art_location": {{ slide.art_location | jsonify }},
    "cite_author": {{ slide.cite_author | jsonify }},
    "cite_url": {{ slide.cite_url | jsonify }}
    }{% if forloop.rindex0 > 0 %},{% endif %}
  {% endfor %}
  }
});
