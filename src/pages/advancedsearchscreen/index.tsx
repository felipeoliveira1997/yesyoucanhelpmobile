import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, ScrollView, StatusBar, Platform, StyleSheet, Alert } from 'react-native';
import { useTheme, Text, Avatar, Headline, List, Title, IconButton, Checkbox, Subheading, Divider, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Lottie from "lottie-react-native";

import {
    DatePicker,
    CheckBoxComponent,
    RadioGroupComponent,
    NavigationButon,
    MainButton,
    ButtonComponent,
    DropdownYesComponent,
    SnackBarYes,
    CardAdvanced
} from '../../components';

//translate
import translate from '../../services/translate/translate'

//mock
import { GetFormatDate, ValidationInputDate } from './mock';

//models
import { AdvancedSearch, AdvancedSearchResponse, ContributionsAdvanced, HouselessAdvanced } from '../../models';

//services
import { GetAdvancedSearchContributions, GetAdvancedSearchAskContributions, GetAdvancedSearchHouseless } from '../../services/api/AdvancedSearch';

//context
import Auth from '../../context/auth';

//childs
import { CardsContributionsAndAsk, CardsHouseless } from './factory'

//validation
import { SwitchErros } from './validation'
const AdvancedSerach = () => {

    const paperTheme = useTheme();
    const { navigate } = useNavigation();
    const { user } = useContext(Auth)

    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());
    const [showstartdate, setShowStartDate] = useState(false);
    const [showenddate, setShowEndDate] = useState(false);
    const [isReported, setIsReported] = useState(false);
    const [isliked, setIsLiked] = useState(false);
    const [radiovalue, setRadioValue] = useState('askcontribution');
    const [dropdownvalueproduct, setDropdownValueProduct] = useState('')
    const [lstcontributionandAks, setLstcontributionandAks] = useState<Array<ContributionsAdvanced>>([] as Array<ContributionsAdvanced>)
    const [lstHouselessAdvanced, setLstHouselessAdvanced] = useState<Array<HouselessAdvanced>>([] as Array<HouselessAdvanced>)
    const [loading, setLoading] = useState(false)
    const [enableButton, setEnableButton] = useState(true)


    //state about notification
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const [title, setTitle] = useState("")

    useFocusEffect(
        React.useCallback(() => {
            const _startdate = GetFormatDate(startdate)
            const _enddate = GetFormatDate(enddate)
            async function getAdvancedSearchAskContributions() {
                const objModel: AdvancedSearch = {
                    startdate: _startdate,
                    enddate: _enddate,
                    typeaction: radiovalue,
                    accept: "",
                    rating: "",
                    product: dropdownvalueproduct
                }
                const response = await GetAdvancedSearchAskContributions(objModel, user!)
                if (response) {
                    setLstcontributionandAks(response)
                    console.log(response)
                }
            }
            getAdvancedSearchAskContributions()
            setEnableButton(false)
            return () => {
                clearfields()
                null
            }
        }, [])
    );


    useEffect(() => {

        if (radiovalue == "infohouseless") {
            setDropdownValueProduct("")
        }

    }, [radiovalue])

    function clearfields() {
        setIsLiked(false)
        setStartDate(new Date())
        setEndDate(new Date())
        setShowStartDate(false)
        setShowEndDate(false)
        setIsReported(false)
        setRadioValue("askcontribution")
        setDropdownValueProduct("")
        setLstHouselessAdvanced([])
        setLstcontributionandAks([])
    }

    function onChangeStartDate(event: any, selectedDate: any) {
        setShowStartDate(false);
        setStartDate(selectedDate)
    }
    function onChangeEndDate(event: any, selectedDate: any) {
        setShowEndDate(false);
        setEndDate(selectedDate)
    }
    function ShowStartDate() {
        setShowStartDate(showstartdate ? false : true);
    }

    function ShowEndDate() {
        setShowEndDate(showenddate ? false : true);
    }

    async function switchAPi(objModel: AdvancedSearch) {
        try {
            setEnableButton(true)
            if (objModel.typeaction === "askcontribution") {
                setLstHouselessAdvanced([])
                const response = await GetAdvancedSearchAskContributions(objModel, user!)
                if (response) {
                    setLstcontributionandAks(response)
                    // console.log(response)
                }
                setEnableButton(false)
            } else if (objModel.typeaction === "contribution") {
                setLstHouselessAdvanced([])
                const response = await GetAdvancedSearchContributions(objModel, user!)
                if (response) {
                    setLstcontributionandAks(response)
                    // console.log(response)
                }
                setEnableButton(false)
            } else if (objModel.typeaction === "infohouseless") {
                setLstcontributionandAks([])
                const response = await GetAdvancedSearchHouseless(objModel, user!)
                if (response) {
                    setLstHouselessAdvanced(response)
                    // console.log(response)
                }
                setEnableButton(false)
            }

        } catch (error) {
            setEnableButton(false)
            Promise.reject(error)
        }
    }

    async function getadvancedsearch() {
        try {
            const _startdate = GetFormatDate(startdate)
            const _enddate = GetFormatDate(enddate)
            if (ValidationInputDate(_startdate, _enddate)) {
                const objModel: AdvancedSearch = {
                    startdate: _startdate,
                    enddate: _enddate,
                    typeaction: radiovalue,
                    accept: "",
                    rating: "",
                    product: dropdownvalueproduct
                }
                await switchAPi(objModel)

            } else {
                setEnableButton(false)
                Alert.alert('EndDate não pode ser menos que StartDate')
            }
        } catch (error) {
            setEnableButton(false)
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
            setIsVisible(true)
        }
    }

    function switchresponseData(value: string) {
        switch (value) {
            case "askcontribution":
                return (
                    <CardsContributionsAndAsk lstcontributionandAks={lstcontributionandAks} />
                )
                break;
            case "contribution":
                return (
                    <CardsContributionsAndAsk lstcontributionandAks={lstcontributionandAks} />
                )
                break;
            case "infohouseless":
                return (
                    <CardsHouseless lstHouselessAdvanced={lstHouselessAdvanced} />
                )
                break;
            default:
                return (
                    <>
                    </>
                )
                break;
        }
    }

    function onPress() {
        setIsVisible(!isVisible)
    }
    return (
        <SafeAreaView style={{ width: "100%", flex: 1, alignContent: "center", alignItems: "center" }}>

            <View style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: '3%', marginTop: '5%' }}>
                <Headline style={{ alignSelf: "center", fontWeight: "bold" }}>
                    {translate("advanced_search_menu")}
                </Headline>
            </View>
            <View style={{
                width: '95%', height: 196,
                borderRadius: 10, backgroundColor: paperTheme.colors.background, shadowColor: '#FAFAFA',
                shadowOffset: { width: 0, height: 12 }, shadowOpacity: 1, shadowRadius: 16.00, elevation: 20, display: "flex",
                flexDirection: "column", marginBottom: "2%"
            }}>
                <View style={{ width: '100%', height: 40, backgroundColor: paperTheme.colors.primary, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: "center" }}>
                    <Subheading style={{ paddingLeft: '4%', alignSelf: "center" }}>
                        {translate("select_filters")}
                    </Subheading>
                </View>
                <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <DatePicker ShowStartDate={ShowStartDate} startdate={startdate} enddate={enddate} ShowEndDate={ShowEndDate} />
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <CheckBoxComponent isValue={isReported} setValueCheckbox={setIsReported} title="reported" />
                        <CheckBoxComponent isValue={isliked} setValueCheckbox={setIsLiked} title="accepted" />
                        {radiovalue != "infohouseless" ?
                            <DropdownYesComponent dropdownvalueproduct={dropdownvalueproduct} setDropdownValueProduct={setDropdownValueProduct} />
                            :
                            null
                        }
                    </View>
                </View>
                <RadioGroupComponent value={radiovalue} setValue={setRadioValue} />
            </View>

            {showstartdate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startdate}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={onChangeStartDate}
                />
            )}

            {showenddate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={enddate}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={onChangeEndDate}
                />
            )}


            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, marginTop: '1%' }}>
                {switchresponseData(radiovalue)}
            </ScrollView>

            <View style={styles.bottomButonsView}>
                <Button mode="text"
                    onPress={() => navigate('OptionsScreens')}
                    style={{ width: '25%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: paperTheme.colors.text }}
                    color={paperTheme.colors.text}
                    disabled={enableButton}
                >
                    {translate("back")}
                </Button>
                <ButtonComponent iconName="search" isSend={loading} nameButton={translate("search")}
                    size={20} styles={styles.buttoncomponente} MainActionScreen={getadvancedsearch}
                    enableButton={enableButton}
                />
                <Button mode="outlined"
                    onPress={() => clearfields()}
                    style={{ width: '25%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: paperTheme.colors.surface }}
                    color={paperTheme.colors.surface}
                    disabled={enableButton}
                >
                    {translate("clean")}
                </Button>
            </View>
            <SnackBarYes isVisible={isVisible} onDismiss={onPress} onPress={onPress}
                text={text}
                style={{
                    height: 50, width: "90%",
                    backgroundColor: colorbackground, alignSelf: "center", bottom: 15,
                    display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", zIndex: 2
                }}
                textcolor={textcolor} subcolorButton={subcolorButton} title={title}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bottomButonsView: {
        width: '100%',
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: '3%',
        alignContent: "center", alignItems: "center"
    },
    buttoncomponente: {
        width: '30%',
        height: 41,
        display: "flex",
        justifyContent: "center",
        color: "#000000"
    }
})

export default AdvancedSerach;