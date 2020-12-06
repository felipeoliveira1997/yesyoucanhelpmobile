import React from 'react'
import { Alert } from 'react-native';
import { useTheme } from 'react-native-paper';

import translate from '../../services/translate/translate'

interface ErrorSwitch {
    status: number,
    name: string
}

export function SwitchErros(
    value: number,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setColorBackground: React.Dispatch<React.SetStateAction<string>>,
    setTextColor: React.Dispatch<React.SetStateAction<string>>,
    setSubcolorButton: React.Dispatch<React.SetStateAction<string>>,
    paperTheme: any
): void {

    switch (value) {
        case 201:
            setText("has_been_update")
            setColorBackground(paperTheme.colors.onSurface)
            setTextColor("#212121")
            setSubcolorButton("#212121")
            break;
        case 401:
            setError(true)
            setText("necessary_data_not_informed")
            setColorBackground(paperTheme.colors.third)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
        case 404:
            setError(true)
            setText("user_not_found")
            setColorBackground(paperTheme.colors.notification)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
        case 500:
            setText("internal_server_error")
            setColorBackground(paperTheme.colors.error)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
        default:
            setText("internal_server_error")
            setColorBackground(paperTheme.colors.error)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
    }
}