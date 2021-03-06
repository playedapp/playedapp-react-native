// Based on https://stackoverflow.com/a/13627586
export const toOrdinal = number => {
  const j = number % 10
  const k = number % 100

  if (j == 1 && k != 11) return number + "st"
  if (j == 2 && k != 12) return number + "nd"
  if (j == 3 && k != 13) return number + "rd"
  return number + "th"
}

export const formatDuration = duration => {
  const hours = Math.floor(duration / 60)
  const minutes = Math.floor(duration % 60)

  let str = ""
  if (hours) {
    str = `${hours} h `
  }
  if (minutes) {
    str += `${minutes} min`
  }

  return str
}

export const removeFromArray = (array, item) => {
  const newArray = array.slice()
  newArray.splice(newArray.indexOf(item), 1)
  return newArray
}

export const constrainImageSize = (originalWidth, originalHeight, maxSize) => {
  let newWidth, newHeight

  if (originalWidth > originalHeight) {
    newWidth = maxSize
    newHeight = maxSize * (originalHeight / originalWidth)
  } else {
    newWidth = maxSize * (originalWidth / originalHeight)
    newHeight = maxSize
  }

  return [newWidth, newHeight]
}

export const followedParticipants = participants => {
  return participants.filter(
    participant => participant.person && participant.person.isFollowedByMe,
  )
}

export const notFollowedParticipants = participants => {
  return participants.filter(
    participant => participant.person && !participant.person.isFollowedByMe,
  )
}

export const anonymousParticipants = participants => {
  return participants.filter(participant => !participant.person)
}
