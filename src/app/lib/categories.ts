export type ChannelCategory =
    'Sports'
    | 'Food'
    | 'Fitness'
    | 'Business'
    | 'E-Sports'
    | 'Football'
    | 'Golf'
    | 'Livestreams'

export const categories: { value: ChannelCategory, label: ChannelCategory }[] = ['Sports', 'Food', 'Fitness', 'Business', 'E-Sports', 'Football', 'Golf', 'Livestreams']
    .map(category => ({ value: category as ChannelCategory, label: category as ChannelCategory }));