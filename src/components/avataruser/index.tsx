import React from 'react';
import { Avatar } from 'react-native-paper';
import { AvatarUser as AvatarModel } from '../../models/AvatarUser'

interface AvatarUser {
    size: number,
    avatarSource: AvatarModel
}

export function AvatarUser(props: AvatarUser) {

    const { size, avatarSource } = props

    return (
        <Avatar.Image style={{ alignSelf: "center", }} size={size} source={{ uri:  avatarSource.uri!}} />
    )
}