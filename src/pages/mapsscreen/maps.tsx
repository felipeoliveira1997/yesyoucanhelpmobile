import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { Platform, SafeAreaView, View, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, MarkerAnimated, Marker } from 'react-native-maps';
import { Text, useTheme } from 'react-native-paper';
const thememaps = require('../../assets/theme/darkmaptheme.json')

//Components

//Models
import { ItemMapsLocationModels, MapsLocationModels } from '../../models';

interface Maps {
    lstContribution: Array<ItemMapsLocationModels>,
    lstAskContribution: Array<ItemMapsLocationModels>,
    lstInfoHouseless: Array<ItemMapsLocationModels>,
    choicetheme: boolean,
    userlocation: MapsLocationModels,
    visibileAnimatable(): void,
    getDetailsCardAskontributions(idDocument: string): void
    getDetailsCardInfoHouseless(idDocument: string): void
    GetDataBySpecificPoint(titlecardpoint: string, point: number): Promise<void>
}

export function Maps(props: Maps) {

    const paperTheme = useTheme();
    const { navigate, setParams } = useNavigation();

    const { lstAskContribution, lstContribution, lstInfoHouseless, choicetheme, userlocation,
        visibileAnimatable, getDetailsCardAskontributions, getDetailsCardInfoHouseless, GetDataBySpecificPoint } = props;


    return (
        <MapView style={{ flex: 1, zIndex: -1, width: '100%', opacity: 1 }} provider={PROVIDER_GOOGLE}
            showsUserLocation={true} customMapStyle={choicetheme ? thememaps : []}
            initialRegion={{ latitude: userlocation.latitude, longitude: userlocation.longitude, latitudeDelta: 0.2, longitudeDelta: 0.2 }}
            mapType={"standard"}
        >

            {lstAskContribution?.map(marker => (
                <MarkerAnimated key={marker.idDocument}
                    coordinate={{ latitude: marker.latitude!, longitude: marker.longitude! }}
                    rotation={5} pinColor={paperTheme.colors.onSurface}
                >
                    <Callout tooltip={false} style={{ width: 120, height: 50, borderRadius: 20, alignItems: "center" }}
                        onPress={() => { getDetailsCardAskontributions(marker.idDocument!), visibileAnimatable() }}
                    >
                        <Text style={{ width: '100%', alignSelf: "center", color: '#000000' }}>
                            {marker.description?.substring(0, 45) + '...'}
                        </Text>
                    </Callout>
                </MarkerAnimated>
            ))}

            {lstInfoHouseless?.map(marker => (
                <MarkerAnimated key={marker.idDocument}
                    coordinate={{ latitude: marker.latitude!, longitude: marker.longitude! }}
                    rotation={10} pinColor={paperTheme.colors.third}

                >
                    <Callout tooltip={false} style={{ width: 120, height: 50, borderRadius: 20, alignItems: "center" }}
                        onPress={() => { getDetailsCardInfoHouseless(marker.idDocument!), visibileAnimatable() }}
                    >
                        <Text style={{ width: '100%', alignSelf: "center", color: '#000000' }}>
                            {marker.description?.substring(0, 45) + '...'}
                        </Text>
                    </Callout>
                </MarkerAnimated>
            ))}


            <Marker coordinate={{ latitude: -22.908592, longitude: -47.075944 }} pinColor="violet">
                <Callout tooltip={false} style={{ width: 120, height: 50, borderRadius: 20, alignItems: "center" }}
                    onPress={() => { GetDataBySpecificPoint("contribution_menu", 13035270) }}
                >
                    <Text style={{ width: '100%', alignSelf: "center", color: '#000000' }}>
                        poha
                    </Text>
                </Callout>
            </Marker>

            <Marker coordinate={{ latitude: -22.784969, longitude: -47.1924555 }} pinColor="violet">
                <Callout tooltip={false} style={{ width: 120, height: 50, borderRadius: 20, alignItems: "center" }}
                    onPress={() => { GetDataBySpecificPoint("contribution_menu", 13142150) }}
                >
                    <Text style={{ width: '100%', alignSelf: "center", color: '#000000' }}>
                        poha2
                    </Text>
                </Callout>
            </Marker>

        </MapView>
    )
}