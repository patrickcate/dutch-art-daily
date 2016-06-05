---
layout: compress
sitemap:
  exclude: true
---
{
  "pages": {
    {% for page in site.pages %}
      "{{ page.date | date: '%m-%d'}}": {{ page.content | jsonify }}
      {% if forloop.rindex0 > 0 %},{% endif %}
    {% endfor %}
  }
}
