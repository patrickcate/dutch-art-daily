---
layout: compress
---
{
  "posts": {
    {% for slide in site.slides %}
      "{{ slide.date | date: '%m-%d'}}": {{ slide.output | jsonify }}
      {% if forloop.rindex0 > 0 %},{% endif %}
    {% endfor %}
  }
}
