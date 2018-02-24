//=============================================================================
// Frogboy RMMV Plugin
// FROG_LevelBasedTraitsRace.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_LevelBasedTraitsRace = true;

var FROG = FROG || {};
FROG.LBTR = FROG.LBTR || {};

/*:
 * @plugindesc v1.1 Add traits to races as they level up
 * @author Frogboy
 *
 * @help
 * Level Based Traits for Races v1.1
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows requires FROG_RaceCore to be installed.  It extends its
 * functionality by allowing actors with races to gain traits as they level up.
 *
 * Races are a core element of character creation in games like Dungeons &
 * Dragons but surprisingly absent in RPG Maker.  Here are few examples of what
 * you can easily implement with this plugin based on the race they are
 * assigned.
 *
 *     Adjust Elemental Resistance
 *     Increase Hit%, Critical% and/or Evade%
 *     Resist status ailments better
 *     Gain immunity to Poison and/or Disease
 *     Gain Extra Attacks
 *     Reduce Floor Damage
 *     Gain a chance to Poison or Blind when attacking
 *     Gain addition Skill Types
 *     Gain new weapon and armor proficiencies
 *     No longer risk being surprised during encounters
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Install FROG_RaceCore and place it in the list before this plugin.  This
 * plugin allows you to define traits for you actors based on what race is
 * assigned to them.
 *
 * Example:
 *
 * Dwarves
 *
 * This race is usually quite hearty and has better constitution than most.  As
 * such, they would likely receive a bonus to Max HP and better resistance to
 * Poison.  They also tend to be more resistant to Magic.
 *
 * Under Race-based Traits -> Param -> Parameter -> Max HP, enter in these
 *    parameter values.
 * Description: Dwarven HP Up
 * Race ID: 4 (Default Race ID for Dwarf in the FROG_RaceCore plugin)
 * Start Level: 1
 * End Level: 100
 * Parameter: Max HP
 * Percentage: 110
 *
 * Under Race-based Traits -> Rate -> State Rate -> Poison, enter in these
 *    parameter values.
 * Description: Dwarven Poison Resistance
 * Race: 4
 * Start Level: 1
 * End Level: 10
 * Parameter: Poison
 * Percentage: 90
 *
 * Description: Dwarven Poison Resistance
 * Race: 4
 * Start Level: 10
 * End Level: 30
 * Parameter: Poison
 * Percentage: 50
 *
 * Description: Dwarven Poison Resistance
 * Race: 4
 * Start Level: 30
 * End Level: 100
 * Parameter: Poison
 * Percentage: 0
 *
 * Under Race-based Traits -> Param -> Parameter -> Magic Defense, enter in
 *    these parameter values.
 * Description: Dwarven Magic Resistance
 * Race: 4
 * Start Level: 1
 * End Level: 100
 * Parameter: Magic Defense
 * Percentage: 120
 *
 *
 * Elves
 *
 * This race is typically more lean and nimble than most others.  They are
 * usually more attuned with Magic as well.  As such, they would receive a
 * bonus to Agility and Magic Attack but take a penalty to Max HP and be more
 * susceptible to Poison.  Elves are also taught to use swords and bows from a
 * young age so should gain weapon proficiency in those.  They may need to have
 * a slight decrease to Defense as well to balance them out.  I’m not going to
 * list out how to set this one or the other common race archetypes as it
 * should be pretty easy to figure out.  If you need any help with this, let me
 * know in the RPG Maker Web forums.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.
 * Credit Frogboy in your work
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0 - Initial release
 * Version 1.1 - Integration with my new FROG_RaceCore plugin.
 *               Better optimization.
 *
 * ============================================================================
 *
 * @param Race Based Traits
 * @param Rate
 * @parent Race Based Traits
 * @param Param
 * @parent Race Based Traits
 * @param Attack
 * @parent Race Based Traits
 * @param Skill
 * @parent Race Based Traits
 * @param Equip
 * @parent Race Based Traits
 * @param Other
 * @parent Race Based Traits
 *
 *
 * @param Element Rate
 * @parent Rate
 * @type struct<raceElementStruct>[]
 * @desc Add a Element Rate for a race at a given level.
 * @default []
 *
 * @param Debuff Rate
 * @parent Rate
 * @type struct<raceDebuffStruct>[]
 * @desc Add a Debuff Rate for a race at a given level.
 * @default []
 *
 * @param State Rate
 * @parent Rate
 * @type struct<raceStateRateStruct>[]
 * @desc Add a State Rate for a race at a given level.
 * @default []
 *
 * @param State Resist
 * @parent Rate
 * @type struct<raceStateResistStruct>[]
 * @desc Add a State Immunity for a race at a given level.
 * @default []
 *
 * @param Parameter
 * @parent Param
 * @type struct<raceParameterStruct>[]
 * @desc Add a Parameter for a race at a given level.
 * @default []
 *
 * @param Ex-Parameter
 * @parent Param
 * @type struct<raceExParameterStruct>[]
 * @desc Add an Ex-Parameter for a race at a given level.
 * @default []
 *
 * @param Sp-Parameter
 * @parent Param
 * @type struct<raceSpParameterStruct>[]
 * @desc Add a Sp-Parameter for a race at a given level.
 * @default []
 *
 * @param Attack Element
 * @parent Attack
 * @type struct<raceAttackElementStruct>[]
 * @desc Add Attack Element for a race at a given level.
 * @default []
 *
 * @param Attack State
 * @parent Attack
 * @type struct<raceAttackStateStruct>[]
 * @desc Add Attack State for a race at a given level.
 * @default []
 *
 * @param Attack Speed
 * @parent Attack
 * @type struct<raceAttackSpeedStruct>[]
 * @desc Add Attack Speed for a race at a given level.
 * @default []
 *
 * @param Extra Attacks
 * @parent Attack
 * @type struct<raceExtraAttacksStruct>[]
 * @desc Add Extra Attacks for a race at a given level.
 * @default []
 *
 * @param Add Skill Type
 * @parent Skill
 * @type struct<raceAddSkillTypeStruct>[]
 * @desc Add a Skill Type for a race at a given level.
 * @default []
 *
 * @param Seal Skill Type
 * @parent Skill
 * @type struct<raceAddSkillTypeStruct>[]
 * @desc Seal a Skill Type for a race at a given level.
 * @default []
 *
 * @param Add Skill
 * @parent Skill
 * @type struct<raceAddSkillStruct>[]
 * @desc Add a Skill for a race at a given level.
 * @default []
 *
 * @param Seal Skill
 * @parent Skill
 * @type struct<raceAddSkillStruct>[]
 * @desc Seal a Skill for a race at a given level.
 * @default []
 *
 * @param Equip Weapon
 * @parent Equip
 * @type struct<raceEquipWeaponStruct>[]
 * @desc Add a Weapon Type for a race at a given level.
 * @default []
 *
 * @param Equip Armor
 * @parent Equip
 * @type struct<raceEquipArmorStruct>[]
 * @desc Add an Armor Type for a race at a given level.
 * @default []
 *
 * @param Slot Type
 * @parent Equip
 * @type struct<raceSlotTypeStruct>[]
 * @desc Enable Dual Wield for this race.
 * @default []
 *
 * @param Action Times
 * @parent Other
 * @type struct<raceActionTimesStruct>[]
 * @desc Increase the probability of taking extra actions in a battle.
 * @default []
 *
 * @param Special Flag
 * @parent Other
 * @type struct<raceSpecialFlagStruct>[]
 * @desc Special states
 * @default []
 *
 * @param Party Ability
 * @parent Other
 * @type struct<racePartyAbilityStruct>[]
 * @desc Abilities shared by the entire party if any member possesses it.
 * @default []
*/

/* =========================================================================
   TRAIT STRUCTURES
   ========================================================================= */

/*~struct~raceElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Element ID
 * @type number
 * @desc The ID of the element as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~raceDebuffStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Max HP
 * @value 0
 * @option Max MP
 * @value 1
 * @option Attack
 * @value 2
 * @option Defense
 * @value 3
 * @option Magic Attack
 * @value 4
 * @option Magic Defense
 * @value 5
 * @option Agility
 * @value 6
 * @option Luck
 * @value 7
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~raceStateRateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param State
 * @type state
 * @desc The State being adjusted.
 * @default 1
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~raceStateResistStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param State
 * @type state
 * @desc The State being adjusted.
 * @default 1
 */
/*~struct~raceParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Max HP
 * @value 0
 * @option Max MP
 * @value 1
 * @option Attack
 * @value 2
 * @option Defense
 * @value 3
 * @option Magic Attack
 * @value 4
 * @option Magic Defense
 * @value 5
 * @option Agility
 * @value 6
 * @option Luck
 * @value 7
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~raceExParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Ex-Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Hit Rate
 * @value 0
 * @option Evasion Rate
 * @value 1
 * @option Critical Rate
 * @value 2
 * @option Critical Evasion
 * @value 3
 * @option Magic Evasion
 * @value 4
 * @option Magic Reflection
 * @value 5
 * @option Counter Attack
 * @value 6
 * @option HP Regeneration
 * @value 7
 * @option MP Regeneration
 * @value 8
 * @option TP Regeneration
 * @value 9
 *
 * @param Percentage
 * @type number
 * @desc This percentage is added to the race's total.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~raceSpParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Sp-Parameter
 * @type select
 * @desc Parameter to adjust.
 * @default 0
 * @option Target Rate
 * @value 0
 * @option Guard Effect
 * @value 1
 * @option Recovery Effect
 * @value 2
 * @option Pharmacology
 * @value 3
 * @option MP Cost Rate
 * @value 4
 * @option TP Charge Rate
 * @value 5
 * @option Physical Damage
 * @value 6
 * @option Magical Damage
 * @value 7
 * @option Floor Damage
 * @value 8
 * @option Experience
 * @value 9
 *
 * @param Percentage
 * @type number
 * @desc Multiplied by this percentage.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~raceAttackElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Element ID
 * @type number
 * @desc The ID of the element as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~raceAttackStateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param State
 * @type state
 * @desc State applied as an additional effect to a normal attack.
 * @default 1
 *
 * @param Percentage
 * @type number
 * @desc Percentage chance that state will be added with a normal attack.
 * @default 5
 * @max 1000
 * @min 0
 */
/*~struct~raceAttackSpeedStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Attack Speed
 * @type number
 * @desc Added to agility when determining turn order when normal attack chosen.
 * @default 1
 * @max 1000
 * @min -1000
 */
/*~struct~raceExtraAttacksStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Extra Attacks
 * @type number
 * @desc The number of extra attacks given.
 * @default 1
 * @max 9
 * @min 0
 */
/*~struct~raceAddSkillTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Skill Type ID
 * @type number
 * @desc The Skill Type being added.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~raceAddSkillStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Skill ID
 * @type skill
 * @desc The Skill being added.
 * @default 1
 */
/*~struct~raceEquipWeaponStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Weapon ID
 * @type number
 * @desc The ID of the weapon type as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~raceEquipArmorStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Armor ID
 * @type number
 * @desc The ID of the armor type as listed in the Types section of the database.
 * @default 1
 * @max 99
 * @min 1
 */
/*~struct~raceSlotTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Slot Type
 * @type select
 * @desc Sword and Board or Dual Wield. That is the question.
 * @default 0
 * @option Normal
 * @value 0
 * @option Dual Wield
 * @value 1
 */
/*~struct~raceActionTimesStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Percentage
 * @type number
 * @desc Percentage chance that additional action will be added.
 * @default 100
 * @max 100
 * @min 0
 */
/*~struct~raceSpecialFlagStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Special Flag
 * @type select
 * @desc Grant a special state to a race
 * @default 0
 * @option Auto Battle
 * @value 0
 * @option Guard
 * @value 1
 * @option Substitute
 * @value 2
 * @option Preserve TP
 * @value 3
 */
/*~struct~racePartyAbilityStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Race ID
 * @type number
 * @desc Race ID as defined in FROG_RaceCore.
 * @default 1
 *
 * @param Start Level
 * @type number
 * @desc The level that the trait will be acquired.
 * @default 1
 *
 * @param End Level
 * @type number
 * @desc The level that the trait will expire, usually to be replaced with a better trait of the same type.
 * @default 100
 *
 * @param Party Ability
 * @type select
 * @desc
 * @default 0
 * @option Encounter Half
 * @value 0
 * @option Encounter None
 * @value 1
 * @option Cancel Surprise
 * @value 2
 * @option Raise Pre-emptive
 * @value 3
 * @option Gold Double
 * @value 4
 * @option Drop Item Double
 * @value 5
 */

(function() {
	FROG.LBTR.prm = PluginManager.parameters('FROG_LevelBasedTraitsRace');
	FROG.LBTR.elementRate = (FROG.LBTR.prm['Element Rate']) ? JSON.parse(FROG.LBTR.prm['Element Rate']) : [];
	FROG.LBTR.debuffRate = (FROG.LBTR.prm['Debuff Rate']) ? JSON.parse(FROG.LBTR.prm['Debuff Rate']) : [];
	FROG.LBTR.stateRate = (FROG.LBTR.prm['State Rate']) ? JSON.parse(FROG.LBTR.prm['State Rate']) : [];
	FROG.LBTR.stateResist = (FROG.LBTR.prm['State Resist']) ? JSON.parse(FROG.LBTR.prm['State Resist']) : [];
	FROG.LBTR.parameter = (FROG.LBTR.prm['Parameter']) ? JSON.parse(FROG.LBTR.prm['Parameter']) : [];
	FROG.LBTR.exParameter = (FROG.LBTR.prm['Ex-Parameter']) ? JSON.parse(FROG.LBTR.prm['Ex-Parameter']) : [];
	FROG.LBTR.spParameter = (FROG.LBTR.prm['Sp-Parameter']) ? JSON.parse(FROG.LBTR.prm['Sp-Parameter']) : [];
	FROG.LBTR.attackElement = (FROG.LBTR.prm['Attack Element']) ? JSON.parse(FROG.LBTR.prm['Attack Element']) : [];
	FROG.LBTR.attackState = (FROG.LBTR.prm['Attack State']) ? JSON.parse(FROG.LBTR.prm['Attack State']) : [];
	FROG.LBTR.attackSpeed = (FROG.LBTR.prm['Attack Speed']) ? JSON.parse(FROG.LBTR.prm['Attack Speed']) : [];
	FROG.LBTR.extraAttacks = (FROG.LBTR.prm['Extra Attacks']) ? JSON.parse(FROG.LBTR.prm['Extra Attacks']) : [];
	FROG.LBTR.addSkillType = (FROG.LBTR.prm['Add Skill Type']) ? JSON.parse(FROG.LBTR.prm['Add Skill Type']) : [];
	FROG.LBTR.sealSkillType = (FROG.LBTR.prm['Seal Skill Type']) ? JSON.parse(FROG.LBTR.prm['Seal Skill Type']) : [];
	FROG.LBTR.addSkill = (FROG.LBTR.prm['Add Skill']) ? JSON.parse(FROG.LBTR.prm['Add Skill']) : [];
	FROG.LBTR.sealSkill = (FROG.LBTR.prm['Seal Skill']) ? JSON.parse(FROG.LBTR.prm['Seal Skill']) : [];
	FROG.LBTR.equipWeapon = (FROG.LBTR.prm['Equip Weapon']) ? JSON.parse(FROG.LBTR.prm['Equip Weapon']) : [];
	FROG.LBTR.equipArmor = (FROG.LBTR.prm['Equip Armor']) ? JSON.parse(FROG.LBTR.prm['Equip Armor']) : [];
	FROG.LBTR.slotType = (FROG.LBTR.prm['Slot Type']) ? JSON.parse(FROG.LBTR.prm['Slot Type']) : [];
	FROG.LBTR.actionTimes = (FROG.LBTR.prm['Action Times']) ? JSON.parse(FROG.LBTR.prm['Action Times']) : [];
	FROG.LBTR.specialFlag = (FROG.LBTR.prm['Special Flag']) ? JSON.parse(FROG.LBTR.prm['Special Flag']) : [];
	FROG.LBTR.partyAbility = (FROG.LBTR.prm['Party Ability']) ? JSON.parse(FROG.LBTR.prm['Party Ability']) : [];

	// Initialize race properties
	Game_Actor.prototype.initRace = function() {
		if (Imported.FROG_Races === true) {
			if (this._race === undefined) this._race = {};
			if (this._race.traits === undefined) this._race.traits = [];
		}
	}

	// Called everytime the engine checks for traits which is prety much all the time.
	FROG.LBTR.Game_Actor_allTraits = Game_Actor.prototype.allTraits;
	Game_Actor.prototype.allTraits = function() {
		FROG.LBTR.traits = FROG.LBTR.Game_Actor_allTraits.call(this);
		if (Imported.FROG_Races === true && this._race && this._race.traits) {
			FROG.LBTR.traits = FROG.LBTR.traits.concat(this._race.traits);
		}
		return FROG.LBTR.traits;
	}

	// Called right after the actors are initialized
    FROG.LBTR.Game_Actor_Setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        FROG.LBTR.Game_Actor_Setup.call(this, actorId);

		if (Imported.FROG_Races === true && this._level <= $dataActors[actorId].initialLevel) {
			this.initRace();
			this.addRaceTraits();
		}
	}

	// Actor level up
	FROG.LBTR.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function () {
		FROG.LBTR.Game_Actor_levelUp.call(this);

		if (Imported.FROG_Races === true && this._race && this._race.traits) {
			this.addRaceTraits();
		}
	}

	// Actor change level
	FROG.LBTR.Game_Actor_changeLevel = Game_Actor.prototype.changeLevel;
	Game_Actor.prototype.changeLevel = function (level, show) {
		FROG.LBTR.Game_Actor_changeLevel.call(this, level, show);

		if (Imported.FROG_Races === true && this._race && this._race.traits) {
			this.addRaceTraits();
		}
	}

	// Actor change experience
	FROG.LBTR.Game_Actor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function (exp, show) {
		FROG.LBTR.Game_Actor_changeExp.call(this, exp, show);

		if (Imported.FROG_Races === true && this._race && this._race.traits) {
			this.addRaceTraits();
		}
	}

	/** Assembles all of the level-based traits for this actor
	 * @returns {object} Returns traits to be added to the actor based on race and level
	 */
	Game_Actor.prototype.addRaceTraits = function () {
		this._race.traits = [];
		this.addTraitGroupRace(FROG.LBTR.elementRate, 11, "Element ID", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.debuffRate, 12, "Parameter", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.stateRate, 13, "State", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.stateResist, 14, "State", "N/A");
		this.addTraitGroupRace(FROG.LBTR.parameter, 21, "Parameter", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.exParameter, 22, "Ex-Parameter", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.spParameter, 23, "Sp-Parameter", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.attackElement, 31, "Element ID", "N/A");
		this.addTraitGroupRace(FROG.LBTR.attackState, 32, "State", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.attackSpeed, 33, "Attack Speed", "N/A");
		this.addTraitGroupRace(FROG.LBTR.extraAttacks, 34, "N/A", "Extra Attacks");
		this.addTraitGroupRace(FROG.LBTR.addSkillType, 41, "Skill Type ID", "N/A");
		this.addTraitGroupRace(FROG.LBTR.sealSkillType, 42, "Skill Type ID", "N/A");
		this.addTraitGroupRace(FROG.LBTR.addSkill, 43, "Skill ID", "N/A");
		this.addTraitGroupRace(FROG.LBTR.sealSkill, 44, "Skill ID", "N/A");
		this.addTraitGroupRace(FROG.LBTR.equipWeapon, 51, "Weapon ID", "N/A");
		this.addTraitGroupRace(FROG.LBTR.equipArmor, 52, "Armor ID", "N/A");
		this.addTraitGroupRace(FROG.LBTR.slotType, 55, "Slot Type", "N/A");
		this.addTraitGroupRace(FROG.LBTR.actionTimes, 61, "N/A", "Percentage");
		this.addTraitGroupRace(FROG.LBTR.specialFlag, 62, "Special Flag", "N/A");
		this.addTraitGroupRace(FROG.LBTR.partyAbility, 64, "Party Ability", "N/A");
	}

	/** Adds traits to an actor
	 * @param {array} traitArray - An array of traits defined in the plugin parameters (required)
	 * @param {number} code - Numeric code that corresponds to a trait (required)
	 * @param {string} dataLbl - The plugin parameter property for the data property
	 * @param {string} valueLbl - The plugin parameter property for the value property
	 */
	Game_Actor.prototype.addTraitGroupRace = function (traitArray, code, dataLbl, valueLbl) {
		if (traitArray && traitArray.length > 0) {
			for (var i=0; i<traitArray.length; i++) {
				var trait = JSON.parse(traitArray[i]);
				var raceId = parseInt(trait["Race ID"]);
				var startLvl = parseInt(trait["Start Level"]);
				var endLvl = parseInt(trait["End Level"]);
				var dataId = (dataLbl !== "N/A") ? parseInt(trait[dataLbl]) : 0;
				var value = (valueLbl !== "N/A") ? parseInt(trait[valueLbl]) : null;
				if (valueLbl == "Percentage" && isNaN(value) == false) {
					value = value / 100;
				}

				if (this.raceId() == raceId && this._level >= startLvl && this._level < endLvl) {
					if (value !== null) {
						this._race.traits.push({
							code: code,
							dataId: dataId,
							value: value
						});
					}
					else {
						this._race.traits.push({
							code: code,
							dataId: dataId
						});
					}
				}
			}
		}
	}

	/** Set an actor's race
	 * @param {number} actorId - The ID of an actor (required)
	 * @param {number} race - The Race ID that you want to set (required)
	 * @returns {string} Returns true if it worked, false if it didn't
	 */
	FROG.LBTR.setRace = function (actorId, raceId) {
		var bOk = false;
		if (isNaN(actorId) === false && actorId > 0 && raceId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor) {
				actor.initRace();
				actor.addRaceTraits();
				bOk = true;
			}
		}
		return bOk;
	}

	/* ---------------------------------------------------------------*\
							Plugin Commands
	\* -------------------------------------------------------------- */
	// Add new plugin commands
	FROG.LBTR.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	    FROG.LBTR.Game_Interpreter_PluginCommand.call(this, command, args);

		// arg[0] = actorId, arg[1] = raceId
	    if (command.trim().toUpperCase() === 'SETRACE' && args[0] && args[1]) {
			FROG.LBTR.setRace(args[0], args[1]);
		}
	}
})();
