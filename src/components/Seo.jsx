import { useEffect } from 'react'

const DEFAULT_TITLE = 'اربعین تی وی'
const DEFAULT_DESCRIPTION = 'پلتفرم اشتراک و تماشای ویدیوهای مذهبی و آموزشی اربعین تی وی.'

const ensureMetaTag = (selector, attributes) => {
  let element = document.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    document.head.appendChild(element)
  }

  return element
}

function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image,
  url,
  type = 'website',
  noIndex = false,
  schema,
}) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const descTag = ensureMetaTag('meta[name="description"]', { name: 'description' })
    const prevDescription = descTag.getAttribute('content')
    descTag.setAttribute('content', description)

    const robotsTag = ensureMetaTag('meta[name="robots"]', { name: 'robots' })
    const prevRobots = robotsTag.getAttribute('content')
    robotsTag.setAttribute('content', noIndex ? 'noindex, nofollow' : 'index, follow')

    const ogTitle = ensureMetaTag('meta[property="og:title"]', { property: 'og:title' })
    const ogDescription = ensureMetaTag('meta[property="og:description"]', { property: 'og:description' })
    const ogType = ensureMetaTag('meta[property="og:type"]', { property: 'og:type' })
    const ogUrl = ensureMetaTag('meta[property="og:url"]', { property: 'og:url' })
    const ogImage = ensureMetaTag('meta[property="og:image"]', { property: 'og:image' })

    const prevOg = {
      title: ogTitle.getAttribute('content'),
      description: ogDescription.getAttribute('content'),
      type: ogType.getAttribute('content'),
      url: ogUrl.getAttribute('content'),
      image: ogImage.getAttribute('content'),
    }

    ogTitle.setAttribute('content', title)
    ogDescription.setAttribute('content', description)
    ogType.setAttribute('content', type)
    if (url) ogUrl.setAttribute('content', url)
    if (image) ogImage.setAttribute('content', image)

    const twitterCard = ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' })
    const twitterTitle = ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' })
    const twitterDescription = ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' })
    const twitterImage = ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' })

    const prevTwitter = {
      card: twitterCard.getAttribute('content'),
      title: twitterTitle.getAttribute('content'),
      description: twitterDescription.getAttribute('content'),
      image: twitterImage.getAttribute('content'),
    }

    twitterCard.setAttribute('content', 'summary_large_image')
    twitterTitle.setAttribute('content', title)
    twitterDescription.setAttribute('content', description)
    if (image) twitterImage.setAttribute('content', image)

    let canonicalLink = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonicalLink?.getAttribute('href')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    if (url) canonicalLink.setAttribute('href', url)

    let schemaScript = null
    if (schema) {
      schemaScript = document.createElement('script')
      schemaScript.type = 'application/ld+json'
      schemaScript.text = JSON.stringify(schema)
      document.head.appendChild(schemaScript)
    }

    return () => {
      document.title = previousTitle
      if (prevDescription) descTag.setAttribute('content', prevDescription)
      if (prevRobots) robotsTag.setAttribute('content', prevRobots)

      if (prevOg.title) ogTitle.setAttribute('content', prevOg.title)
      if (prevOg.description) ogDescription.setAttribute('content', prevOg.description)
      if (prevOg.type) ogType.setAttribute('content', prevOg.type)
      if (prevOg.url) ogUrl.setAttribute('content', prevOg.url)
      if (prevOg.image) ogImage.setAttribute('content', prevOg.image)

      if (prevTwitter.card) twitterCard.setAttribute('content', prevTwitter.card)
      if (prevTwitter.title) twitterTitle.setAttribute('content', prevTwitter.title)
      if (prevTwitter.description) twitterDescription.setAttribute('content', prevTwitter.description)
      if (prevTwitter.image) twitterImage.setAttribute('content', prevTwitter.image)

      if (canonicalLink && previousCanonical) {
        canonicalLink.setAttribute('href', previousCanonical)
      }

      if (schemaScript) {
        schemaScript.remove()
      }
    }
  }, [description, image, noIndex, schema, title, type, url])

  return null
}

export default Seo
