import React from 'react'
import { Alert } from 'react-native';

import translate from '../../services/translate/translate'

interface ErrorSwitch {
    status: number,
    name: string
}

export function SwitchErros(
    value: number,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setColorBackground: React.Dispatch<React.SetStateAction<string>>,
    setTextColor: React.Dispatch<React.SetStateAction<string>>,
    setSubcolorButton: React.Dispatch<React.SetStateAction<string>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    paperTheme: any
): void {
    switch (value) {
        case 201:
            setTitle("completed")
            setText("completed_order_message")
            setColorBackground(paperTheme.colors.onSurface)
            setTextColor("#212121")
            setSubcolorButton("#212121")
            break;
        case 204:
            setTitle("attention")
            setText("attention_message")
            setColorBackground(paperTheme.colors.third)
            setTextColor("#212121")
            setSubcolorButton("#212121")
            break;
        case 401:
            setTitle("error")
            setText("necessary_data_not_informed")
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