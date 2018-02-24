//=============================================================================
// Frogboy RMMV Plugin
// FROG_LevelBasedTraitsActor.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_LevelBasedTraitsActor = true;

var FROG = FROG || {};
FROG.LBTA = FROG.LBTA || {};

/*:
 * @plugindesc v1.0 Add traits to actors as they level up
 * @author Frogboy
 *
 * @help
 * Level Based Traits for Actors v1.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Alright!  Marsha has all her awesome fire-based skills.  Now all she
 * needs are fire-based traits to go with them and she will be finished.  Okay,
 * so she should probably start out with 10% fire protection and it’ll scale up
 * until around level 50 where she will gain full immunity.  Let’s enter this
 * into the editor and … uhhh … crap!
 *
 * By default RPG Maker only gives you the ability to make it so that a
 * character either has a trait or doesn’t have a trait.  There’s no in-between.
 * Full fire immunity seems a bit too much for Marsha at level 1.  And what
 * about Therese?  He was supposed to get an extra attack every 10 levels?
 * He can’t start with 6 attacks!!!
 *
 * That’s where this plugin comes into play.  Now you can define level-based
 * traits in an easy to understand way that closely resembles the editor itself.
 *
 * Here are few examples of what you can easily do as your characters advance.
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
 * Fill in the paramerters.  That's it.  Seriously.  Here's what they look like.
 *
 * Description - This is text that you’ll want to enter so that you’ll know
 *    what that particular level-based trait is.  An example would be something
 *    like “Marsha - 10% Fire Resist Lvl 1”.  This isn’t required but is
 *    very helpful so you know what each one is doing at a glance.
 *
 * Actor - This is where you select the actor that this level-based trait
 *    belongs to.
 *
 * Start Level - This is the level that the actor gains this trait.
 *
 * End Level - This is the level that this trait will expire.  Because of the
 *    way MV stacks traits, it’s often times better to remove one and then
 *    replace it with a better version.  Otherwise, newer version will be
 *    combined and produce harder to manage results.
 *
 * Trait-specific Parameters - There will always be one or two parameters that
 *    you will fill in just as you would in the editor itself.  Most of the
 *    time, you’ll be able to select easy to understand options from drop-down
 *    lists like “Encounter Half” for Party Ability.  The exception to this
 *    are your custom Types in the database.  For whatever reason, the 1.5
 *    plugin parameters don’t have an option to generate a select list from
 *    these so you have to enter in the ID until this oversight is remedied.
 *
 *
 * Examples:
 *
 * I want Therese to gain an extra attack every 10 levels.
 *
 * Under Actor-based Traits -> Attack -> Extra Attacks, enter in these
 * parameter values.  Because Extra Attacks are added and not multiplied, you
 * can just add one extra attack every 10 levels and they will accumulate.
 *
 * Description: Therese Lvl 10 - 2 Attacks
 * Actor: Select Therese from the list
 * Start Level: 10
 * End Level: 100 (This is always the default end value)
 * Extra Attacks: 1
 *
 * Description: Therese Lvl 20 - 3 Attacks
 * Actor: Select Therese from the list
 * Start Level: 20
 * End Level: 100
 * Extra Attacks: 1
 *
 * … do the same for levels 30 and 40 …
 *
 * Description: Therese Lvl 50 - 6 Attacks
 * Actor: Select Therese from the list
 * Start Level: 50
 * End Level: 100
 * Extra Attacks: 1
 *
 *
 * I want Marsha to gain fire resistance as she levels up.
 *
 * Under Class-based Traits -> Rates -> Element Rate, enter in these parameter
 * values.  Because Element Rate is multiplied when stacked, you’ll want to set
 * each one to expire when the next kicks in so that only one is ever added to
 * the actor or class at a time.
 *
 * Description: Marsha Lvl 1 - 20% Resist
 * Actor: Select Marsha from the list
 * Start Level: 1
 * End Level: 10
 * Element ID: 2 (Sorry, no way to make list from this)
 * Percentage: 80
 *
 * Description: Marsha Lvl 10 - 40% Resist
 * Actor: Select Marsha from the list
 * Start Level: 10
 * End Level: 20
 * Element ID: 2
 * Percentage: 60
 *
 * Description: Marsha Lvl 20 - 60% Resist
 * Actor: Select Marsha from the list
 * Start Level: 20
 * End Level: 30
 * Element ID: 2
 * Percentage: 40
 *
 * Description: Marsha Lvl 30 - 80% Resist
 * Actor: Select Marsha from the list
 * Start Level: 30
 * End Level: 40
 * Element ID: 2
 * Percentage: 20
 *
 * Description: Marsha Lvl 40 - Fire Immunity
 * Actor: Select Marsha from the list
 * Start Level: 40
 * End Level: 100
 * Element ID: 2
 * Percentage: 0
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
 *
 * ============================================================================
 *
 * @param Actor Based Traits
 * @param Rate
 * @parent Actor Based Traits
 * @param Param
 * @parent Actor Based Traits
 * @param Attack
 * @parent Actor Based Traits
 * @param Skill
 * @parent Actor Based Traits
 * @param Equip
 * @parent Actor Based Traits
 * @param Other
 * @parent Actor Based Traits
 *
 *
 * @param Element Rate
 * @parent Rate
 * @type struct<actElementStruct>[]
 * @desc Add a Element Rate for an actor at a given level.
 * @default []
 *
 * @param Debuff Rate
 * @parent Rate
 * @type struct<actDebuffStruct>[]
 * @desc Add a Debuff Rate for an actor at a given level.
 * @default []
 *
 * @param State Rate
 * @parent Rate
 * @type struct<actStateRateStruct>[]
 * @desc Add a State Rate for an actor at a given level.
 * @default []
 *
 * @param State Resist
 * @parent Rate
 * @type struct<actStateResistStruct>[]
 * @desc Add a State Immunity for an actor at a given level.
 * @default []
 *
 * @param Parameter
 * @parent Param
 * @type struct<actParameterStruct>[]
 * @desc Add a Parameter for an actor at a given level.
 * @default []
 *
 * @param Ex-Parameter
 * @parent Param
 * @type struct<actExParameterStruct>[]
 * @desc Add an Ex-Parameter for an actor at a given level.
 * @default []
 *
 * @param Sp-Parameter
 * @parent Param
 * @type struct<actSpParameterStruct>[]
 * @desc Add a Sp-Parameter for an actor at a given level.
 * @default []
 *
 * @param Attack Element
 * @parent Attack
 * @type struct<actAttackElementStruct>[]
 * @desc Add Attack Element for an actor at a given level.
 * @default []
 *
 * @param Attack State
 * @parent Attack
 * @type struct<actAttackStateStruct>[]
 * @desc Add Attack State for an actor at a given level.
 * @default []
 *
 * @param Attack Speed
 * @parent Attack
 * @type struct<actAttackSpeedStruct>[]
 * @desc Add Attack Speed for an actor at a given level.
 * @default []
 *
 * @param Extra Attacks
 * @parent Attack
 * @type struct<actExtraAttacksStruct>[]
 * @desc Add Extra Attacks for an actor at a given level.
 * @default []
 *
 * @param Add Skill Type
 * @parent Skill
 * @type struct<actAddSkillTypeStruct>[]
 * @desc Add a Weapon Type for an actor at a given level.
 * @default []
 *
 * @param Seal Skill Type
 * @parent Skill
 * @type struct<actAddSkillTypeStruct>[]
 * @desc Seal a Skill Type for an actor at a given level.
 * @default []
 *
 * @param Add Skill
 * @parent Skill
 * @type struct<actAddSkillStruct>[]
 * @desc Add a Skill for an actor at a given level.
 * @default []
 *
 * @param Seal Skill
 * @parent Skill
 * @type struct<actAddSkillStruct>[]
 * @desc Seal a Skill for an actor at a given level.
 * @default []
 *
 * @param Equip Weapon
 * @parent Equip
 * @type struct<actEquipWeaponStruct>[]
 * @desc Add an Armor Type for an actor at a given level.
 * @default []
 *
 * @param Equip Armor
 * @parent Equip
 * @type struct<actEquipArmorStruct>[]
 * @desc Add a Skill Type for an actor at a given level.
 * @default []
 *
 * @param Slot Type
 * @parent Equip
 * @type struct<actSlotTypeStruct>[]
 * @desc Enable Dual Wield for this actor.
 * @default []
 *
 * @param Action Times
 * @parent Other
 * @type struct<actActionTimesStruct>[]
 * @desc Increase the probability of taking extra actions in a battle.
 * @default []
 *
 * @param Special Flag
 * @parent Other
 * @type struct<actSpecialFlagStruct>[]
 * @desc Special states
 * @default []
 *
 * @param Party Ability
 * @parent Other
 * @type struct<actPartyAbilityStruct>[]
 * @desc Abilities shared by the entire party if any member possesses it.
 * @default []
*/

/* =========================================================================
   TRAIT STRUCTURES
   ========================================================================= */

/*~struct~actElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actDebuffStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actStateRateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actStateResistStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actExParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
 * @desc This percentage is added to the actor's total.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~actSpParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actAttackElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actAttackStateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actAttackSpeedStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actExtraAttacksStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actAddSkillTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actAddSkillStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actEquipWeaponStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actEquipArmorStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actSlotTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actActionTimesStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
/*~struct~actSpecialFlagStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
 * @desc Grant a special state to an actor
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
/*~struct~actPartyAbilityStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Actor
 * @type actor
 * @desc The actor that will gain the trait.
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
	FROG.LBTA.prm = PluginManager.parameters('FROG_LevelBasedTraitsActor');
	FROG.LBTA.elementRate = (FROG.LBTA.prm['Element Rate']) ? JSON.parse(FROG.LBTA.prm['Element Rate']) : [];
	FROG.LBTA.debuffRate = (FROG.LBTA.prm['Debuff Rate']) ? JSON.parse(FROG.LBTA.prm['Debuff Rate']) : [];
	FROG.LBTA.stateRate = (FROG.LBTA.prm['State Rate']) ? JSON.parse(FROG.LBTA.prm['State Rate']) : [];
	FROG.LBTA.stateResist = (FROG.LBTA.prm['State Resist']) ? JSON.parse(FROG.LBTA.prm['State Resist']) : [];
	FROG.LBTA.parameter = (FROG.LBTA.prm['Parameter']) ? JSON.parse(FROG.LBTA.prm['Parameter']) : [];
	FROG.LBTA.exParameter = (FROG.LBTA.prm['Ex-Parameter']) ? JSON.parse(FROG.LBTA.prm['Ex-Parameter']) : [];
	FROG.LBTA.spParameter = (FROG.LBTA.prm['Sp-Parameter']) ? JSON.parse(FROG.LBTA.prm['Sp-Parameter']) : [];
	FROG.LBTA.attackElement = (FROG.LBTA.prm['Attack Element']) ? JSON.parse(FROG.LBTA.prm['Attack Element']) : [];
	FROG.LBTA.attackState = (FROG.LBTA.prm['Attack State']) ? JSON.parse(FROG.LBTA.prm['Attack State']) : [];
	FROG.LBTA.attackSpeed = (FROG.LBTA.prm['Attack Speed']) ? JSON.parse(FROG.LBTA.prm['Attack Speed']) : [];
	FROG.LBTA.extraAttacks = (FROG.LBTA.prm['Extra Attacks']) ? JSON.parse(FROG.LBTA.prm['Extra Attacks']) : [];
	FROG.LBTA.addSkillType = (FROG.LBTA.prm['Add Skill Type']) ? JSON.parse(FROG.LBTA.prm['Add Skill Type']) : [];
	FROG.LBTA.sealSkillType = (FROG.LBTA.prm['Seal Skill Type']) ? JSON.parse(FROG.LBTA.prm['Seal Skill Type']) : [];
	FROG.LBTA.addSkill = (FROG.LBTA.prm['Add Skill']) ? JSON.parse(FROG.LBTA.prm['Add Skill']) : [];
	FROG.LBTA.sealSkill = (FROG.LBTA.prm['Seal Skill']) ? JSON.parse(FROG.LBTA.prm['Seal Skill']) : [];
	FROG.LBTA.equipWeapon = (FROG.LBTA.prm['Equip Weapon']) ? JSON.parse(FROG.LBTA.prm['Equip Weapon']) : [];
	FROG.LBTA.equipArmor = (FROG.LBTA.prm['Equip Armor']) ? JSON.parse(FROG.LBTA.prm['Equip Armor']) : [];
	FROG.LBTA.slotType = (FROG.LBTA.prm['Slot Type']) ? JSON.parse(FROG.LBTA.prm['Slot Type']) : [];
	FROG.LBTA.actionTimes = (FROG.LBTA.prm['Action Times']) ? JSON.parse(FROG.LBTA.prm['Action Times']) : [];
	FROG.LBTA.specialFlag = (FROG.LBTA.prm['Special Flag']) ? JSON.parse(FROG.LBTA.prm['Special Flag']) : [];
	FROG.LBTA.partyAbility = (FROG.LBTA.prm['Party Ability']) ? JSON.parse(FROG.LBTA.prm['Party Ability']) : [];

	// Initialize race properties
	Game_Actor.prototype.initLBTA = function() {
		if (this._lvlBasedTraits === undefined) this._lvlBasedTraits = [];
	}

	// Called everytime the engine checks for traits which is prety much all the time.
	FROG.LBTA.Game_Actor_allTraits = Game_Actor.prototype.allTraits;
	Game_Actor.prototype.allTraits = function() {
		FROG.LBTA.traits = FROG.LBTA.Game_Actor_allTraits.call(this);
		this.initLBTA();
		FROG.LBTA.traits = FROG.LBTA.traits.concat(this._lvlBasedTraits);
		return FROG.LBTA.traits;
	}

	// Called right after the actors are initialized
    FROG.LBTA.Game_Actor_Setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        FROG.LBTA.Game_Actor_Setup.call(this, actorId);
		this.initLBTA();
		this.addActorTraits();
	}

	// Actor level up
	FROG.LBTA.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function () {
		FROG.LBTA.Game_Actor_levelUp.call(this);
		this.addActorTraits();
	}

	// Actor change level
	FROG.LBTA.Game_Actor_changeLevel = Game_Actor.prototype.changeLevel;
	Game_Actor.prototype.changeLevel = function (level, show) {
		FROG.LBTA.Game_Actor_changeLevel.call(this, level, show);
		this.addActorTraits();
	}

	// Actor change experience
	FROG.LBTA.Game_Actor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function (exp, show) {
		FROG.LBTA.Game_Actor_changeExp.call(this, exp, show);
		this.addActorTraits();
	}

	/** Assembles all of the level-based traits for this actor
	 * @returns {object} Returns traits to be added to the actor based on level
	 */
	Game_Actor.prototype.addActorTraits = function () {
		this._lvlBasedTraits = [];
		this.addTraitGroupActor(FROG.LBTA.elementRate, 11, "Element ID", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.debuffRate, 12, "Parameter", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.stateRate, 13, "State", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.stateResist, 14, "State", "N/A");
		this.addTraitGroupActor(FROG.LBTA.parameter, 21, "Parameter", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.exParameter, 22, "Ex-Parameter", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.spParameter, 23, "Sp-Parameter", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.attackElement, 31, "Element ID", "N/A");
		this.addTraitGroupActor(FROG.LBTA.attackState, 32, "State", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.attackSpeed, 33, "Attack Speed", "N/A");
		this.addTraitGroupActor(FROG.LBTA.extraAttacks, 34, "N/A", "Extra Attacks");
		this.addTraitGroupActor(FROG.LBTA.addSkillType, 41, "Skill Type ID", "N/A");
		this.addTraitGroupActor(FROG.LBTA.sealSkillType, 42, "Skill Type ID", "N/A");
		this.addTraitGroupActor(FROG.LBTA.addSkill, 43, "Skill ID", "N/A");
		this.addTraitGroupActor(FROG.LBTA.sealSkill, 44, "Skill ID", "N/A");
		this.addTraitGroupActor(FROG.LBTA.equipWeapon, 51, "Weapon ID", "N/A");
		this.addTraitGroupActor(FROG.LBTA.equipArmor, 52, "Armor ID", "N/A");
		this.addTraitGroupActor(FROG.LBTA.slotType, 55, "Slot Type", "N/A");
		this.addTraitGroupActor(FROG.LBTA.actionTimes, 61, "N/A", "Percentage");
		this.addTraitGroupActor(FROG.LBTA.specialFlag, 62, "Special Flag", "N/A");
		this.addTraitGroupActor(FROG.LBTA.partyAbility, 64, "Party Ability", "N/A");
	}

	/** Adds traits to an actor
	 * @param {array} traitArray - An array of traits defined in the plugin parameters (required)
	 * @param {number} code - Numeric code that corresponds to a trait (required)
	 * @param {string} dataLbl - The plugin parameter property for the data property
	 * @param {string} valueLbl - The plugin parameter property for the value property
	 */
	Game_Actor.prototype.addTraitGroupActor = function (traitArray, code, dataLbl, valueLbl) {
		if (traitArray && traitArray.length > 0) {
			for (var i=0; i<traitArray.length; i++) {
				var trait = JSON.parse(traitArray[i]);
				var actorId = parseInt(trait["Actor"]);
				var startLvl = parseInt(trait["Start Level"]);
				var endLvl = parseInt(trait["End Level"]);
				var dataId = (dataLbl !== "N/A") ? parseInt(trait[dataLbl]) : 0;
				var value = (valueLbl !== "N/A") ? parseInt(trait[valueLbl]) : null;
				if (valueLbl == "Percentage" && isNaN(value) == false) {
					value = value / 100;
				}

				if (this._actorId == actorId && this._level >= startLvl && this._level < endLvl) {
					if (value !== null) {
						this._lvlBasedTraits.push({
							code: code,
							dataId: dataId,
							value: value
						});
					}
					else {
						this._lvlBasedTraits.push({
							code: code,
							dataId: dataId
						});
					}
				}
			}
		}
	}
})();
