export default function (linkDoc) {
  const linkType = linkDoc.type ? linkDoc.type.toLowerCase() : linkDoc.link_type.toLowerCase()

  if (linkDoc.isBroken) {
    return '/not-found'
  }

  switch (linkType) {
    case 'homepage':
      return '/'
    case 'document':
      return '/' + (linkDoc.uid ? linkDoc.uid : '')
    case 'page':
      return '/' + linkDoc.uid
    case 'article':
      return '/insights/' + linkDoc.uid
    case 'city':
      return '/city/' + linkDoc.uid
    case 'web':
      return linkDoc.url
    default:
      return '/not-found'
  }
};
