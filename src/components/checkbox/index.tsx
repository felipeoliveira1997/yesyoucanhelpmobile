import React, { useState, useEffect, useContext, memo } from 'react';
import { View } from 'react-native';
import { Checkbox, IconButton, Text, useTheme, Subheading } from 'react-native-paper';

//translate
import translate from '../../services/translate/translate'
interface Check {
    isValue: boolean,
    setValueCheckbox: React.Dispatch<React.SetStateAction<boolean>>,
    title: string
}
const Check = (props: Check) => {

    const paperTheme = useTheme();
    const { isValue, setValueCheckbox, title } = props;

    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center", width: '25%', elevation: 3 }}>
            <Subheading>
                {translate(title)}
            </Subheading>
            <Checkbox
                disabled={true}
                status={isValue ? 'checked' : 'unchecked'}
                onPress={() => setValueCheckbox(!isValue)}
                color={paperTheme.colors.primary}
                uncheckedColor={paperTheme.colors.primary}
            />
        </View>
    )
}

export const CheckBoxComponent = memo(Check);