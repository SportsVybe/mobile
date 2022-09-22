import { Picker } from "@react-native-community/picker";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useUserTeams from "../../api/Moralis/useUserTeams";
import { contractActions } from "../../configs/constants";
import { Challenge, Team } from "../../configs/types";
import { capitalizeWord } from "../../helpers/formatters";
import { useContract } from "../../providers/ContractProvider";
import { useCustomMoralis } from "../../providers/CustomMoralisProvider";
import AuthorizeButton from "../Buttons/AuthorizeButton";
import { Photo } from "../Photo";

type Props = {
  challengeTeam: Team | null;
  createNewChallenge: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
  modalView: boolean;
  challenge?: Challenge;
};

function ManageChallenge({
  challengeTeam,
  modalView,
  toggleModal,
  createNewChallenge,
  challenge = null,
}: Props): JSX.Element {
  const getChallengesDB = useNewMoralisObject("challenges");
  const [challengeAmount, setChallengeAmount] = useState<string>("");
  const [challengeMessage, setChallengeMessage] = useState("");
  const [teamModalVisible, toggleChooseTeamModalVisible] = useState(false);
  const [challengeTeam1, setChallengeTeam1] = useState<Team | null>(null);
  const [challengeTeam2, setChallengeTeam2] = useState<Team | null>(null);
  const [challengeTeam1_chainId, setChallengeTeam1_chainId] = useState<string>(
    "",
  );
  const [challengeSports, setChallengeSports] = useState("");
  const { user } = useMoralis();
  const { userTeams } = useUserTeams({ username: user?.get("username") });
  const { createUserAction } = useCustomMoralis();
  const { createChallenge, isContractLoading } = useContract();

  const challengeFormData: Challenge = {
    id: (challenge && challenge.id) || "",
    challengeChainId: (challenge && challenge.get("challengeChainId")) || "",
    actionId: (challenge && challenge.get("actionId")) || "",
    challengeAmount: String(challengeAmount),
    challengeMessage: challengeMessage,
    challengeSport: challengeSports,
    challengeTeam1: challengeTeam1,
    challengeTeam1_chainId: challengeTeam1_chainId,
    challengeTeam1Admin: user.get("username"),
    challengeTeam1Count:
      (challengeTeam1 &&
        challengeTeam1.get("teamMembers") &&
        challengeTeam1.get("teamMembers").length) ||
      0,
    challengeTeam1TeamMembers:
      (challengeTeam1 && challengeTeam1.get("teamMembers")) || [],
    challengeTeam2: challengeTeam,
    challengeTeam2_chainId:
      (challengeTeam && challengeTeam.get("teamChainId")) || "",
    challengeTeam2Admin:
      (challengeTeam && challengeTeam.get("teamAdmin")) || "",
    challengeTeam2Count:
      (challengeTeam &&
        challengeTeam.get("teamMembers") &&
        challengeTeam.get("teamMembers").length) ||
      0,
    challengeTeam2TeamMembers:
      (challengeTeam && challengeTeam.get("teamMembers")) || [],
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        if (createNewChallenge) {
          const action = await createUserAction(
            contractActions.createChallenge,
          );
          const actionId = action.id;
          challengeFormData.actionId = action;
          // create challenge on chain
          const createChallengeOnChain = await createChallenge(
            actionId,
            challengeTeam1_chainId,
            challengeTeam.get("teamChainId"),
            String(challengeAmount),
          );

          // create new challenge to database...
          if (!isContractLoading && createChallengeOnChain) {
            await getChallengesDB.save(challengeFormData);
            // router.push("/challenges");
          } else if (!isContractLoading && !createChallengeOnChain) {
            await action.save({ actionStatus: false });
          }
          if (getChallengesDB.error) console.log(getChallengesDB.error.message);
        }

        // update challenge in database
        if (challenge && !createNewChallenge) {
          challengeFormData.id = challenge.id;
          await challenge.save(challengeFormData);
          // router.push("/challenges");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSports = (sport: string, isChecked: boolean) => {
    if (isChecked) {
      setChallengeSports("");
    } else {
      setChallengeSports(sport);
    }
  };
  const handleSelectTeam = (teamChainId: string) => {
    if (!teamChainId) {
      setChallengeTeam1(null);
      return;
    }
    const selectedTeam = userTeams?.teamOwnerActiveTeams.find(
      // eslint-disable-next-line
      team => team?.get("teamChainId") === teamChainId,
    );
    setChallengeTeam1(selectedTeam || null);
    setChallengeTeam1_chainId(teamChainId);
  };

  const isFormValid = () => {
    if (!challengeTeam1 || !challengeAmount || !challengeSports) {
      alert("Please fill out required fields.");
      return false;
    }
    if (
      challengeFormData.challengeTeam1Count !=
      challengeFormData.challengeTeam2Count
    ) {
      alert(
        `Teams must have the same number of members. \n Selected Team: ${challengeFormData.challengeTeam1Count} vs Challenged Team: ${challengeFormData.challengeTeam2Count}`,
      );
      return false;
    }
    return true;
  };

  return (
    <Modal visible={modalView}>
      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.modalColHeader}>
                <Text style={styles.modalTitle}>
                  {createNewChallenge
                    ? `Create Challenge Against`
                    : `Manage Challenge Against`}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100%",
                    height: 100,
                  }}>
                  <Photo
                    type="team"
                    isLoading={challengeTeam ? false : true}
                    src={challengeTeam && challengeTeam?.get("teamPhoto")}
                  />
                  <Text style={styles.modalTitle}>
                    {challengeTeam && challengeTeam.get("teamName")}
                  </Text>
                </View>
              </View>
              <View style={styles.modalRow}>
                <View style={styles.modalDivLeft}>
                  <Text style={styles.title}>Choose Team*:</Text>
                </View>
                <View style={styles.modalDivRight}>
                  <TouchableOpacity
                    style={styles.modalSelect}
                    onPress={() => toggleChooseTeamModalVisible(true)}>
                    <Text style={styles.modalSelectText}>
                      {(challengeTeam1 && challengeTeam1.get("teamName")) ||
                        "Select Team"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.modalRow}>
                <View style={styles.modalDivLeft}>
                  <Text style={styles.title}>Amount*:</Text>
                </View>
                <View style={styles.modalDivRight}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={text => setChallengeAmount(text)}
                    value={String(challengeAmount)}
                    clearButtonMode="while-editing"
                  />
                </View>
              </View>
              <View style={styles.modalRow}>
                <View style={styles.modalDivLeft}>
                  <Text style={styles.title}>Sport*:</Text>
                </View>

                <View style={styles.modalDivRight}>
                  <View style={styles.sportsPreferencesRow}>
                    {challengeTeam &&
                      challengeTeam.get("teamSportsPreferences") &&
                      challengeTeam
                        .get("teamSportsPreferences")
                        .sort()
                        .map((sport: string, i: number) => {
                          const isChecked = challengeSports.includes(sport);
                          return (
                            <TouchableOpacity
                              key={i}
                              style={[
                                styles.sportsPreferencesButton,
                                {
                                  backgroundColor: isChecked ? "green" : "gray",
                                },
                              ]}
                              onPress={() => handleSports(sport, isChecked)}>
                              <Text style={styles.buttonText}>
                                {capitalizeWord(sport)}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                  </View>
                </View>
              </View>
              <View style={styles.modalRow}>
                <View style={styles.modalDivLeft}>
                  <Text style={styles.title}>Message:</Text>
                </View>

                <View style={styles.modalDivRight}>
                  <TextInput
                    style={styles.textArea}
                    value={challengeMessage}
                    clearButtonMode="always"
                    onChangeText={text => setChallengeMessage(text)}
                    placeholder="Enter a challengeMessage"
                    numberOfLines={4}
                    multiline
                  />
                </View>
              </View>
              <View style={styles.modalCol}>
                <AuthorizeButton amount={Number(challengeAmount)} />
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => toggleModal(false)}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            style={styles.modalContainer}
            visible={teamModalVisible}>
            <View style={styles.filterCol}>
              <Text style={styles.modalTitle}>Active Teams:</Text>
              <Picker
                selectedValue={challengeTeam1_chainId}
                mode="dropdown"
                style={styles.picker}
                onValueChange={(itemValue: string, itemIndex) =>
                  handleSelectTeam(itemValue)
                }>
                <Picker.Item label="Select Team" value="" />
                {userTeams &&
                  userTeams.teamOwnerActiveTeams.map((team: any, i: number) => (
                    <Picker.Item
                      label={team.get("teamName")}
                      value={team.get("teamChainId")}
                    />
                  ))}
              </Picker>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  toggleChooseTeamModalVisible(false);
                }}>
                <Text style={styles.buttonText}>Set</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

export default ManageChallenge;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: 20,
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalColHeader: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    flex: 1,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalCol: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalDivRight: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.6,
    marginRight: 20,
  },
  modalDivLeft: {
    alignItems: "flex-start",
    marginLeft: 20,
    paddingLeft: 20,
    flex: 0.4,
  },
  modalSelect: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: 150,
    borderColor: "#000",
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSelectText: {
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#315399",
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  textArea: {
    height: "80%",
    width: 200,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    height: 150,
    width: 250,
  },
  filterCol: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "auto",
    backgroundColor: "#fff",
    height: 300,
  },
  sportsPreferencesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
  sportsPreferencesButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});
