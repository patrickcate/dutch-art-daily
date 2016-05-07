---
layout: compress
---
{
  "posts": [{
    {% for slide in site.slides %}
      {{ slide.date | date: '%m-%d' | jsonify }}:
      {
        "id": {{ slide.id | jsonify }},
        "title": {{ slide.title | jsonify }},
        "artist": {{ slide.artist | jsonify }},
        "art_date": {{ slide.art_date | jsonify }},
        "art_type": {{ slide.art_type | jsonify }},
        "art_height": {{ slide.art_height | jsonify }},
        "art_width": {{ slide.art_width | jsonify }},
        "art_location": {{ slide.art_location | jsonify }},
        "image": {{ slide.image | jsonify }},
        "date": {{ slide.date | jsonify }},
        "url": {{ slide.url | jsonify }},
        "cite_author": {{ slide.cite_author | jsonify }},
        "cite_url": {{ slide.cite_url | jsonify }}
      }{% if forloop.rindex0 > 0 %},{% endif %}
    {% endfor %}
  }]
}
