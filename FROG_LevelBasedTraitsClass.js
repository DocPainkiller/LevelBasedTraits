//=============================================================================
// Frogboy RMMV Plugin
// FROG_LevelBasedTraitsClass.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_LevelBasedTraitsClass = true;

var FROG = FROG || {};
FROG.LBTC = FROG.LBTC || {};

/*:
 * @plugindesc v1.0 Add traits to classes as they level up
 * @author Frogboy
 *
 * @help
 * Level Based Traits for Classes v1.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Alright!  My Fire Mage has all her awesome fire-based skills.  Now all she
 * needs are fire-based traits to go with them and she will be finished.  Okay,
 * so she should probably start out with 10% fire protection and it’ll scale up
 * until around level 50 where she will gain full immunity.  Let’s enter this
 * into the editor and … uhhh … crap!
 *
 * By default RPG Maker only gives you the ability to make it so that a
 * character either has a trait or doesn’t have a trait.  There’s no in-between.
 * Full fire immunity seems a bit too much for a level 1 Fire Mage.  And what
 * about my Fighter?  He was supposed to get an extra attack every 10 levels?
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
 *    like “Fire Mage - 10% Fire Resist Lvl 1”.  This isn’t required but is
 *    very helpful so you know what each one is doing at a glance.
 *
 * Class - This is where you select the class that this level-based trait
 *    belongs to.
 *
 * Start Level - This is the level that the class gains this trait.
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
 * I want my Fighter to gain an extra attack every 10 levels.
 *
 * Under Class-based Traits -> Attack -> Extra Attacks, enter in these
 * parameter values.  Because Extra Attacks are added and not multiplied, you
 * can just add one extra attack every 10 levels and they will accumulate.
 *
 * Description: Fighter Lvl 10 - 2 Attacks
 * Class: Select Fighter from the list
 * Start Level: 10
 * End Level: 100 (This is always the default end value)
 * Extra Attacks: 1
 *
 * Description: Fighter Lvl 20 - 3 Attacks
 * Class: Select Fighter from the list
 * Start Level: 20
 * End Level: 100
 * Extra Attacks: 1
 *
 * … do the same for levels 30 and 40 …
 *
 * Description: Fighter Lvl 50 - 6 Attacks
 * Class: Select Fighter from the list
 * Start Level: 50
 * End Level: 100
 * Extra Attacks: 1
 *
 *
 * I want my Fire Mage to gain fire resistance as she levels up.
 *
 * Under Class-based Traits -> Rates -> Element Rate, enter in these parameter
 * values.  Because Element Rate is multiplied when stacked, you’ll want to set
 * each one to expire when the next kicks in so that only one is ever added to
 * the class at a time.
 *
 * Description: Fire Mage Lvl 1 - 20% Resist
 * Class: Select Fire Mage from the list
 * Start Level: 1
 * End Level: 10
 * Element ID: 2 (Sorry, no way to make list from this)
 * Percentage: 80
 *
 * Description: Fire Mage Lvl 10 - 40% Resist
 * Class: Select Fire Mage from the list
 * Start Level: 10
 * End Level: 20
 * Element ID: 2
 * Percentage: 60
 *
 * Description: Fire Mage Lvl 20 - 60% Resist
 * Class: Select Fire Mage from the list
 * Start Level: 20
 * End Level: 30
 * Element ID: 2
 * Percentage: 40
 *
 * Description: Fire Mage Lvl 30 - 80% Resist
 * Class: Select Fire Mage from the list
 * Start Level: 30
 * End Level: 40
 * Element ID: 2
 * Percentage: 20
 *
 * Description: Fire Mage Lvl 40 - Fire Immunity
 * Class: Select Fire Mage from the list
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
 * @param Class Based Traits
 * @param Rate
 * @parent Class Based Traits
 * @param Param
 * @parent Class Based Traits
 * @param Attack
 * @parent Class Based Traits
 * @param Skill
 * @parent Class Based Traits
 * @param Equip
 * @parent Class Based Traits
 * @param Other
 * @parent Class Based Traits
 *
 *
 * @param Element Rate
 * @parent Rate
 * @type struct<clsElementStruct>[]
 * @desc Add a Element Rate for a class at a given level.
 * @default []
 *
 * @param Debuff Rate
 * @parent Rate
 * @type struct<clsDebuffStruct>[]
 * @desc Add a Debuff Rate for a class at a given level.
 * @default []
 *
 * @param State Rate
 * @parent Rate
 * @type struct<clsStateRateStruct>[]
 * @desc Add a State Rate for a class at a given level.
 * @default []
 *
 * @param State Resist
 * @parent Rate
 * @type struct<clsStateResistStruct>[]
 * @desc Add a State Immunity for a class at a given level.
 * @default []
 *
 * @param Parameter
 * @parent Param
 * @type struct<clsParameterStruct>[]
 * @desc Add a Parameter for a class at a given level.
 * @default []
 *
 * @param Ex-Parameter
 * @parent Param
 * @type struct<clsExParameterStruct>[]
 * @desc Add an Ex-Parameter for a class at a given level.
 * @default []
 *
 * @param Sp-Parameter
 * @parent Param
 * @type struct<clsSpParameterStruct>[]
 * @desc Add a Sp-Parameter for a class at a given level.
 * @default []
 *
 * @param Attack Element
 * @parent Attack
 * @type struct<clsAttackElementStruct>[]
 * @desc Add Attack Element for a class at a given level.
 * @default []
 *
 * @param Attack State
 * @parent Attack
 * @type struct<clsAttackStateStruct>[]
 * @desc Add Attack State for a class at a given level.
 * @default []
 *
 * @param Attack Speed
 * @parent Attack
 * @type struct<clsAttackSpeedStruct>[]
 * @desc Add Attack Speed for a class at a given level.
 * @default []
 *
 * @param Extra Attacks
 * @parent Attack
 * @type struct<clsExtraAttacksStruct>[]
 * @desc Add Extra Attacks for a class at a given level.
 * @default []
 *
 * @param Add Skill Type
 * @parent Skill
 * @type struct<clsAddSkillTypeStruct>[]
 * @desc Add a Skill Type for a class at a given level.
 * @default []
 *
 * @param Seal Skill Type
 * @parent Skill
 * @type struct<clsAddSkillTypeStruct>[]
 * @desc Seal a Skill Type for a class at a given level.
 * @default []
 *
 * @param Add Skill
 * @parent Skill
 * @type struct<clsAddSkillStruct>[]
 * @desc Add a Skill for a class at a given level.
 * @default []
 *
 * @param Seal Skill
 * @parent Skill
 * @type struct<clsAddSkillStruct>[]
 * @desc Seal a Skill for a class at a given level.
 * @default []
 *
 * @param Equip Weapon
 * @parent Equip
 * @type struct<clsEquipWeaponStruct>[]
 * @desc Add a Weapon Type for a class at a given level.
 * @default []
 *
 * @param Equip Armor
 * @parent Equip
 * @type struct<clsEquipArmorStruct>[]
 * @desc Add an Armor Type for a class at a given level.
 * @default []
 *
 * @param Slot Type
 * @parent Equip
 * @type struct<clsSlotTypeStruct>[]
 * @desc Enable Dual Wield for this class.
 * @default []
 *
 * @param Action Times
 * @parent Other
 * @type struct<clsActionTimesStruct>[]
 * @desc Increase the probability of taking extra actions in a battle.
 * @default []
 *
 * @param Special Flag
 * @parent Other
 * @type struct<clsSpecialFlagStruct>[]
 * @desc Special states
 * @default []
 *
 * @param Party Ability
 * @parent Other
 * @type struct<clsPartyAbilityStruct>[]
 * @desc Abilities shared by the entire party if any member possesses it.
 * @default []
*/

/* =========================================================================
   TRAIT STRUCTURES
   ========================================================================= */

/*~struct~clsElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsDebuffStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsStateRateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsStateResistStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsExParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
 * @desc This percentage is added to the class's total.
 * @default 100
 * @max 1000
 * @min 0
 */
/*~struct~clsSpParameterStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsAttackElementStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsAttackStateStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsAttackSpeedStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsExtraAttacksStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsAddSkillTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsAddSkillStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsEquipWeaponStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsEquipArmorStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsSlotTypeStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsActionTimesStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
/*~struct~clsSpecialFlagStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
 * @desc Grant a special state to a class
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
/*~struct~clsPartyAbilityStruct:
 * @param Description
 * @type string
 * @desc Description so you know what this is. Recommended but not required.
 *
 * @param Class
 * @type class
 * @desc The class that will gain the trait.
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
	FROG.LBTC.prm = PluginManager.parameters('FROG_LevelBasedTraitsClass');
	FROG.LBTC.elementRate = (FROG.LBTC.prm['Element Rate']) ? JSON.parse(FROG.LBTC.prm['Element Rate']) : [];
	FROG.LBTC.debuffRate = (FROG.LBTC.prm['Debuff Rate']) ? JSON.parse(FROG.LBTC.prm['Debuff Rate']) : [];
	FROG.LBTC.stateRate = (FROG.LBTC.prm['State Rate']) ? JSON.parse(FROG.LBTC.prm['State Rate']) : [];
	FROG.LBTC.stateResist = (FROG.LBTC.prm['State Resist']) ? JSON.parse(FROG.LBTC.prm['State Resist']) : [];
	FROG.LBTC.parameter = (FROG.LBTC.prm['Parameter']) ? JSON.parse(FROG.LBTC.prm['Parameter']) : [];
	FROG.LBTC.exParameter = (FROG.LBTC.prm['Ex-Parameter']) ? JSON.parse(FROG.LBTC.prm['Ex-Parameter']) : [];
	FROG.LBTC.spParameter = (FROG.LBTC.prm['Sp-Parameter']) ? JSON.parse(FROG.LBTC.prm['Sp-Parameter']) : [];
	FROG.LBTC.attackElement = (FROG.LBTC.prm['Attack Element']) ? JSON.parse(FROG.LBTC.prm['Attack Element']) : [];
	FROG.LBTC.attackState = (FROG.LBTC.prm['Attack State']) ? JSON.parse(FROG.LBTC.prm['Attack State']) : [];
	FROG.LBTC.attackSpeed = (FROG.LBTC.prm['Attack Speed']) ? JSON.parse(FROG.LBTC.prm['Attack Speed']) : [];
	FROG.LBTC.extraAttacks = (FROG.LBTC.prm['Extra Attacks']) ? JSON.parse(FROG.LBTC.prm['Extra Attacks']) : [];
	FROG.LBTC.addSkillType = (FROG.LBTC.prm['Add Skill Type']) ? JSON.parse(FROG.LBTC.prm['Add Skill Type']) : [];
	FROG.LBTC.sealSkillType = (FROG.LBTC.prm['Seal Skill Type']) ? JSON.parse(FROG.LBTC.prm['Seal Skill Type']) : [];
	FROG.LBTC.addSkill = (FROG.LBTC.prm['Add Skill']) ? JSON.parse(FROG.LBTC.prm['Add Skill']) : [];
	FROG.LBTC.sealSkill = (FROG.LBTC.prm['Seal Skill']) ? JSON.parse(FROG.LBTC.prm['Seal Skill']) : [];
	FROG.LBTC.equipWeapon = (FROG.LBTC.prm['Equip Weapon']) ? JSON.parse(FROG.LBTC.prm['Equip Weapon']) : [];
	FROG.LBTC.equipArmor = (FROG.LBTC.prm['Equip Armor']) ? JSON.parse(FROG.LBTC.prm['Equip Armor']) : [];
	FROG.LBTC.slotType = (FROG.LBTC.prm['Slot Type']) ? JSON.parse(FROG.LBTC.prm['Slot Type']) : [];
	FROG.LBTC.actionTimes = (FROG.LBTC.prm['Action Times']) ? JSON.parse(FROG.LBTC.prm['Action Times']) : [];
	FROG.LBTC.specialFlag = (FROG.LBTC.prm['Special Flag']) ? JSON.parse(FROG.LBTC.prm['Special Flag']) : [];
	FROG.LBTC.partyAbility = (FROG.LBTC.prm['Party Ability']) ? JSON.parse(FROG.LBTC.prm['Party Ability']) : [];

	// Initialize race properties
	Game_Actor.prototype.initLBTC = function() {
		var clas = $dataClasses[this._classId];
		if (clas) {
			if (clas.lvlBasedTraits === undefined) clas.lvlBasedTraits = [];
		}
	}

	// Called everytime the engine checks for traits which is prety much all the time.
	FROG.LBTC.Game_Actor_allTraits = Game_Actor.prototype.allTraits;
	Game_Actor.prototype.allTraits = function() {
		FROG.LBTC.traits = FROG.LBTC.Game_Actor_allTraits.call(this);
		var clas = $dataClasses[this._classId];
		if (clas) {
			this.initLBTC();
			FROG.LBTC.traits = FROG.LBTC.traits.concat(clas.lvlBasedTraits);
		}
		return FROG.LBTC.traits;
	}

	// Called right after the actors are initialized
    FROG.LBTC.Game_Actor_Setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        FROG.LBTC.Game_Actor_Setup.call(this, actorId);
		this.initLBTC();
		this.addClassTraits();
	}

	// Class level up
	FROG.LBTC.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function () {
		FROG.LBTC.Game_Actor_levelUp.call(this);
		this.addClassTraits();
	}

	// Class change level
	FROG.LBTC.Game_Actor_changeLevel = Game_Actor.prototype.changeLevel;
	Game_Actor.prototype.changeLevel = function (level, show) {
		FROG.LBTC.Game_Actor_changeLevel.call(this, level, show);
		this.addClassTraits();
	}

	// Class change experience
	FROG.LBTC.Game_Actor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function (exp, show) {
		FROG.LBTC.Game_Actor_changeExp.call(this, exp, show);
		this.addClassTraits();
	}

	/** Assembles all of the level-based traits for this class
	 * @returns {object} Returns traits to be added to the class based on level
	 */
	Game_Actor.prototype.addClassTraits = function () {
		var clas = $dataClasses[this._classId];
		if (clas) {
			this.initLBTC();
			clas.lvlBasedTraits = [];
			this.addTraitGroupClass(FROG.LBTC.elementRate, 11, "Element ID", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.debuffRate, 12, "Parameter", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.stateRate, 13, "State", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.stateResist, 14, "State", "N/A");
			this.addTraitGroupClass(FROG.LBTC.parameter, 21, "Parameter", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.exParameter, 22, "Ex-Parameter", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.spParameter, 23, "Sp-Parameter", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.attackElement, 31, "Element ID", "N/A");
			this.addTraitGroupClass(FROG.LBTC.attackState, 32, "State", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.attackSpeed, 33, "Attack Speed", "N/A");
			this.addTraitGroupClass(FROG.LBTC.extraAttacks, 34, "N/A", "Extra Attacks");
			this.addTraitGroupClass(FROG.LBTC.addSkillType, 41, "Skill Type ID", "N/A");
			this.addTraitGroupClass(FROG.LBTC.sealSkillType, 42, "Skill Type ID", "N/A");
			this.addTraitGroupClass(FROG.LBTC.addSkill, 43, "Skill ID", "N/A");
			this.addTraitGroupClass(FROG.LBTC.sealSkill, 44, "Skill ID", "N/A");
			this.addTraitGroupClass(FROG.LBTC.equipWeapon, 51, "Weapon ID", "N/A");
			this.addTraitGroupClass(FROG.LBTC.equipArmor, 52, "Armor ID", "N/A");
			this.addTraitGroupClass(FROG.LBTC.slotType, 55, "Slot Type", "N/A");
			this.addTraitGroupClass(FROG.LBTC.actionTimes, 61, "N/A", "Percentage");
			this.addTraitGroupClass(FROG.LBTC.specialFlag, 62, "Special Flag", "N/A");
			this.addTraitGroupClass(FROG.LBTC.partyAbility, 64, "Party Ability", "N/A");
		}
	}

	/** Adds traits to an actor
	 * @param {array} traitArray - An array of traits defined in the plugin parameters (required)
	 * @param {number} code - Numeric code that corresponds to a trait (required)
	 * @param {string} dataLbl - The plugin parameter property for the data property
	 * @param {string} valueLbl - The plugin parameter property for the value property
	 */
	Game_Actor.prototype.addTraitGroupClass = function (traitArray, code, dataLbl, valueLbl) {
		if (traitArray && traitArray.length > 0) {
			for (var i=0; i<traitArray.length; i++) {
				var trait = JSON.parse(traitArray[i]);
				var classId = parseInt(trait["Class"]);
				var startLvl = parseInt(trait["Start Level"]);
				var endLvl = parseInt(trait["End Level"]);
				var dataId = (dataLbl !== "N/A") ? parseInt(trait[dataLbl]) : 0;
				var value = (valueLbl !== "N/A") ? parseInt(trait[valueLbl]) : null;
				if (valueLbl == "Percentage" && isNaN(value) == false) {
					value = value / 100;
				}

				if (this._classId == classId && this._level >= startLvl && this._level < endLvl) {
					var clas = $dataClasses[this._classId];
					if (clas) {
						if (value !== null) {
							clas.lvlBasedTraits.push({
								code: code,
								dataId: dataId,
								value: value
							});
						}
						else {
							clas.lvlBasedTraits.push({
								code: code,
								dataId: dataId
							});
						}
					}
				}
			}
		}
	}
})();
