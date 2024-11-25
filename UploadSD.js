const admin = require('firebase-admin');
const serviceAccount = require('./scubed-eda81-firebase-adminsdk-cr7u1-2090f590c5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Initialize Firestore database

// Your shloka data
const shlokas = 
[
    {
      "id": 1,
      "shlokas": "Shloka 1",
      "englishText": "May Swaminarayan Bhagwan, who is Akshar-Purushottam Maharaj himself, bestow ultimate peace, bliss and happiness on all.",
      "gujaratiText": "Swāminārāyaṇ Bhagwān eṭale ke sākṣhāt Akṣhar-Puruṣhottam Mahārāj sarvane param shānti, ānand ane sukh arpe.",
      "sanskritLippy": "Swāminārāyaṇah sākṣhād Akṣhara-Puruṣhottamah ।\\nSarvebhyah paramām shāntim ānandam sukham arpayet ॥1॥",
      "audioURL1": "https://baps.box.com/shared/static/68u8jj15fdhlrsiqqi6b0kph5jvcwdnh.mp3",
      "audioURL": "https://baps.box.com/shared/static/lfisu4y42y4xkrydws9wrb4qm8ub865t.mp3"
    },
    {
      "id": 2,
      "shlokas": "Shloka 2",
      "englishText": "This body is a means for moksha, not merely a means for indulgence [in sense pleasures]. Rare and perishable, this body is not repeatedly attained.",
      "gujaratiText": "Ā deh muktinu sādhan chhe, kevaḷ bhognu sādhan nathī. Durlabh ane nāshvant evo ā deh vāramvār maḷato nathī.",
      "sanskritLippy": "Deho’yam sādhanam mukter na bhoga-mātra-sādhanam ।\\nDurlabho nashvarash-chā’yam vāram-vāram na labhyate ॥2॥",
      "audioURL1": "https://baps.box.com/shared/static/7s0ew9g8w8y0zpvipmfguzmw9f1b6la5.mp3",
      "audioURL": "https://baps.box.com/shared/static/ady6q90qghpgamde4qkkk1w5qqvwkge2.mp3"
    },
    {
      "id": 3,
      "shlokas": "Shloka 3",
      "englishText": "Personal and family activities are [only] for the sustenance of the body. They are not the ultimate objective of this human birth.",
      "gujaratiText": "Laukik vyavahār to dehnā nirvāh māṭe chhe. Te ā manuṣhya janmanu param lakṣhya nathī.",
      "sanskritLippy": "Laukiko vyavahāras-tu deha-nirvāha-hetukah ।\\nNaiva sa paramam lakṣhyam asya manuṣhya-janmanaha ॥3॥",
      "audioURL1": "https://baps.box.com/shared/static/lse4996i30lotoy67smklv0szny2t0iv.mp3",
      "audioURL": "https://baps.box.com/shared/static/33i7fjngvsqn3hj32ix5v2quf8ez33w8.mp3"
    },
    {
      "id": 4,
      "shlokas": "Shloka 4-5",
      "englishText": "This body has been received to eradicate all flaws, attain the brāhmic state and offer devotion to Bhagwan.\\nAll this is certainly attained by practising satsang. Therefore, mumukshus should always practise satsang.",
      "gujaratiText": "Sarva doṣhone ṭāḷavā, brahma-sthitine pāmavā ane Bhagwānnī bhakti karavā ā deh maḷyo chhe. Ā badhu satsang karavāthī avashya prāpta thāya chhe. Āthī mumukṣhuoe sadāya satsang karavo.",
      "sanskritLippy": "Nāshāya sarva-doṣhāṇām brahma-sthiter avāptaye ।\\nKartum Bhagavato bhaktim asya dehasya lambhanam ॥4॥\\nSarvam idam hi satsangāl-labhyate nishchitam janaihi ।\\nAtah sadaiva satsangah karaṇīyo mumukṣhubhihi ॥5॥",
      "audioURL1": "https://baps.box.com/shared/static/6a60kjhtrfhv7d718z208hna9m6h3c2y.mp3",
      "audioURL": "https://baps.box.com/shared/static/0o5mlbuebtg8bxzl6gx00mnfsg5i85kn.mp3"
    },
    {
      "id": 5,
      "shlokas": "Shloka 6",
      "englishText": "For this reason, Parabrahman Swaminarayan himself manifested in this world and established this divine Satsang.",
      "gujaratiText": "Tethī Parabrahma Swāminārāyaṇe ā lokmā sākṣhāt avatarīne ā divya satsangnī sthāpanā karī.",
      "sanskritLippy": "Satsangah sthāpitas-tasmād divyo’yam parabrahmaṇā ।\\nSvāminārāyaṇeneha sākṣhād evā’vatīrya cha ॥6॥",
      "audioURL1": "https://baps.box.com/shared/static/5nzfz03jn1nlv9yqq9updr9h869la8d5.mp3",
      "audioURL": "https://baps.box.com/shared/static/dvzbs1jy85i0fzavcpx8dy4fnuese88t.mp3"
    },
    {
      "id": 6,
      "shlokas": "Shloka 7",
      "englishText": "The shastra titled ‘Satsang Diksha’ has been composed with the pure intent that mumukshus acquire the knowledge of this satsang.",
      "gujaratiText": "Ā satsangnu gnān mumukṣhuone thāya evā shubh āshayathī ‘Satsang-Dīkṣhā’ e nāmnu shāstra rachavāmā āve chhe.",
      "sanskritLippy": "Satsangasyā’sya vignānam mumukṣhūṇām bhaved iti ।\\nShāstram Satsanga-Dīkṣheti shubhā’shayād virachyate ॥7॥",
      "audioURL1": "https://baps.box.com/shared/static/6yz2cvy3caygx1dnrx3sfek011crtb0n.mp3",
      "audioURL": "https://baps.box.com/shared/static/3518do0ix33hfevz5r77gf5qqvghuj4e.mp3"
    },
    {
      "id": 7,
      "shlokas": "Shloka 8-9",
      "englishText": "One should know that the true meaning of satsang is to associate with the ātmā, which is true; to associate with Paramatma, who is true; to associate with the guru, who is true; and to associate with true shastras. One who practises this divine satsang becomes blissful.",
      "gujaratiText": "Satya evā ātmāno sang karavo, satya evā Paramātmāno sang karavo, satya evā guruno sang karavo ane sachchhāstrano sang karavo e satsangnu sāchu lakṣhaṇ jāṇavu. Āvo divya satsang karanār manuṣhya sukhī thāy chhe.",
      "sanskritLippy": "Satyasya svātmanah sangah satyasya Paramātmanah ।\\nSatyasya cha guroh sangah sach-chhāstrāṇām tathaiva cha ॥8॥\\nVignātavyam idam satyam satsangasya hi lakṣhaṇam ।\\nKurvan-nevam vidham divyam satsangam syāt sukhī janaha ॥9॥",
      "audioURL1": "https://baps.box.com/shared/static/ta21cgjorrwvkmjdip6g0e8ryxq9fpkg.mp3",
      "audioURL": "https://baps.box.com/shared/static/fbs5mdp5t3pe6n3z1acgc1eslbx7f4mc.mp3"
    },
    {
      "id": 8,
      "shlokas": "Shloka 10",
      "englishText": "‘Diksha’ means firm resolve, unwavering conviction coupled with faith, absolute dedication, loving faith, observances, and firm refuge.",
      "gujaratiText": "Dīkṣhā eṭale dṛuḍh sankalp, shraddhāe sahit evo achaḷ nishchay, samyak samarpaṇ, prīti-pūrvak niṣhṭhā, vrat ane dṛuḍh āsharo.",
      "sanskritLippy": "Dīkṣheti dṛaḍha-sankalpah sa-shraddham nishchayo’chalaha ।\\nSamyak samarpaṇam prītyā niṣhṭhā vratam dṛaḍhāshrayaha ॥10॥",
      "audioURL1": "https://baps.box.com/shared/static/xq74h8m3i97m1irb3fe283mkiw1ejoo7.mp3",
      "audioURL": "https://baps.box.com/shared/static/dwulo7mk6vyn5v4uchbxdh5ur2lxig07.mp3"
    },
    {
      "id": 9,
      "shlokas": "Shloka 11",
      "englishText": "The methods of āgnā and upāsanā revealed by Parabrahman Sahajanand Paramatma are clearly expressed in this shastra.",
      "gujaratiText": "Ā shāstramā Parabrahma Sahajānand Paramātmāe darshāvel āgnā tathā upāsanānī paddhatine spaṣhṭa rīte jaṇāvī chhe.",
      "sanskritLippy": "Shāstre’smin gnāpitā spaṣhṭam āgnopāsana-paddhatihi ।\\nParamātma-Parabrahma-Sahajānanda-darshitā ॥11॥",
      "audioURL1": "https://baps.box.com/shared/static/bvj56b2b2jv68sb7fhxvfc17w9b2mt2l.mp3",
      "audioURL": "https://baps.box.com/shared/static/k25z1oh8er3jumsnk5tbymj1cyfhlc91.mp3"
    },
    {
      "id": 10,
      "shlokas": "Shloka 12",
      "englishText": "All males and females are entitled to satsang, all are entitled to happiness and all are entitled to brahmavidyā.",
      "gujaratiText": "Puruṣho tathā strīo sarve satsangnā adhikārī chhe, sarve sukhnā adhikārī chhe ane sarve brahma-vidyānā adhikārī chhe.",
      "sanskritLippy": "Satsangā’dhikṛutah sarve sarve sukhā’dhi-kāriṇaha ।\\nSarve’rhā brahmavidyāyām nāryash-chaiva narās-tathā ॥12॥",
      "audioURL1": "https://baps.box.com/shared/static/cqgjuzjhaccfzpxknz4zluotud8ztrkr.mp3",
      "audioURL": "https://baps.box.com/shared/static/dlcpolr2zbua2rcp8hcjs81h7kzx9i98.mp3"
    },
    {
      "id": 11,
      "shlokas": "Shloka 13",
      "englishText": "In Satsang, superiority or inferiority should never be understood to be based on gender. All can attain moksha through devotion while observing the dharma prescribed for them.",
      "gujaratiText": "Satsangmā ling-bhedthī nyūnādhikpaṇu na ja samajavu. Badhā pot-potānī maryādāmā rahī bhakti vaḍe muktine pāmī shake chhe.",
      "sanskritLippy": "Naiva nyūnādhikatvam syāt satsange linga-bhedataha ।\\nSva-sva-maryādayā sarve bhaktyā muktim samāpnuyuhu ॥13॥",
      "audioURL1": "https://baps.box.com/shared/static/m8ow2p2n1nbtb28yzc6y86szflsswgno.mp3",
      "audioURL": "https://baps.box.com/shared/static/6pszqojkcsvpo010s9r3cajt4afwtez1.mp3"
    },
    {
      "id": 12,
      "shlokas": "Shloka 14-16",
      "englishText": "All men and women of all castes are forever entitled to satsang, brahmavidyā and moksha. Do not attribute notions of superiority and inferiority based on varna. All persons should shun their ego based on their caste and serve one another. No one is superior and no one is inferior by birth. Therefore, one should not quarrel based on caste or class and should joyfully practice satsang.",
      "gujaratiText": "Sarva varṇanā sarva strīo tathā sarva puruṣho sadāy satsang, brahma-vidyā ane mokṣhanā adhikārī chhe. Varṇanā ādhāre kyārey nyūnādhik-bhāv na karavo. Sarva janoe potānā varṇanu mān tyajīne paraspar sevā karavī. Jātie karīne koī mahān nathī ane koī nyūn paṇ nathī. Tethī nāt-jātne laīne klesh na karavo ne sukhe satsang karavo.",
      "sanskritLippy": "Sarva-varṇa-gatāh sarvā nāryah sarve narās-tathā ।\\nSatsange brahmavidyāyām mokṣhe sadā’dhikāriṇaha ॥14॥\\nNa nyūnā’dhikatā kāryā varṇā’dhāreṇa karhichit ।\\nTyaktvā sva-varṇa-mānam cha sevā kāryā mithah samaihi ॥15॥\\nJātyā naiva mahān ko’pi naiva nyūnas-tathā yataha ।\\nJātyā klesho na kartavyah sukham satsangam ācharet ॥16॥",
      "audioURL1": "https://baps.box.com/shared/static/rt7xqz5ghu07kkrcqeg7989e54guhs04.mp3",
      "audioURL": "https://baps.box.com/shared/static/prkboflmqffa47mnvmekr0ymhmi51z1o.mp3"
    },
    {
      "id": 13,
      "shlokas": "Shloka 17",
      "englishText": "Householders and renunciants are all entitled to moksha. Between them neither is inferior or superior, because householders and renunciants are all devotees of Bhagwan.",
      "gujaratiText": "Gṛuhasth tathā tyāgī sarve mokṣhanā adhikārī chhe. Temā nyūnādhik-bhāv nathī, kāraṇ ke gṛuhasth ke tyāgī badhā Bhagwānnā bhakto chhe.",
      "sanskritLippy": "Sarve’dhikāriṇo mokṣhe gṛuhiṇas-tyāgino’pi cha ।\\nNa nyūnā’dhikatā tatra sarve bhaktā yatah Prabhoho ॥17॥",
      "audioURL1": "https://baps.box.com/shared/static/gmfjrmccjc7es7d2bb5oyxuwc3slfq7t.mp3",
      "audioURL": "https://baps.box.com/shared/static/2ly4ns9xwelyshbje9fgjzqyq1e5u6at.mp3"
    },
    {
      "id": 14,
      "shlokas": "Shloka 18",
      "englishText": "To offer singular, resolute, and supreme devotion to Bhagwan Swaminarayan, one should receive the Ashray Diksha Mantra and affiliate with the Satsang.",
      "gujaratiText": "Swāminārāyaṇ Bhagwānne viṣhe ananya, dṛuḍh ane param bhakti māṭe āshraya-dīkṣhā-mantra grahaṇ karī satsang prāpta karavo.",
      "sanskritLippy": "Swāminārāyaṇe’nanya-dṛaḍha-parama-bhaktaye ।\\nGṛuhītvā’shraya-dīkṣhāyā mantram satsangam āpnuyāt ॥18॥",
      "audioURL1": "https://baps.box.com/shared/static/s30x7p1ubx5tgwoxv1gcr9xtz3boem54.mp3",
      "audioURL": "https://baps.box.com/shared/static/s4390ndpp1eoy9ejysjmtndiszk7754f.mp3"
    },
    {
      "id": 15,
      "shlokas": "Shloka 19",
      "englishText": "The meaning of this mantra is as follows:\\n“Having taken refuge in Swaminarayan Bhagwan through the association of the Aksharbrahman guru, I am blessed, I am fulfilled, I am without sins, I am fearless and I am blissful.”",
      "gujaratiText": "Āshraya-dīkṣhā mantra ā pramāṇe chhe:\\nDhanyosmi pūrṇakāmosmi niṣhpāpo nirbhayah sukhī ।\\nAkṣhara-guru-yogena Swāminārāyaṇ-āshrayāt ॥",
      "sanskritLippy": "Āshraya-dīkṣhā-mantrash-chaivam vidhaha:\\nDhanyo’smi pūrṇakāmo’smi niṣhpāpo nirbhayah sukhī ।\\nAkṣhara-guru-yogena Swāminārāyaṇā’shrayāt ॥19॥",
      "audioURL1": "https://baps.box.com/shared/static/10wdf6bl8ofy6z2s0kesp34as1zii2mu.mp3",
      "audioURL": "https://baps.box.com/shared/static/qnc5j32e0gyvtdjwkhuvw58yqaqmot3r.mp3"
    },
    {
      "id": 16,
      "shlokas": "Shloka 20",
      "englishText": "For the moksha one’s ātmā, a mumukshu should lovingly take refuge of Sahajanand Shri Hari and the Aksharbrahman Gunatit guru.",
      "gujaratiText": "Mumukṣhu potānā ātmānī mukti māṭe Sahajānand Shrīhari tathā Akṣharbrahma swarūp guṇātīt guruno prītie karīne āsharo kare.",
      "sanskritLippy": "Āshrayet Sahajānandam Harim Brahmā’kṣharam tathā ।\\nGuṇātītam gurum prītyā mumukṣhuh svātma-muktaye ॥20॥",
      "audioURL1": "https://baps.box.com/shared/static/m0l9w9la7yx9h2ak55rqvdyz1parpuga.mp3",
      "audioURL": "https://baps.box.com/shared/static/p309hplvplg7kvsm0rw4fo8sbvnpf7d6.mp3"
    },
    {
      "id": 17,
      "shlokas": "Shloka 21",
      "englishText": "Upon taking the refuge of satsang, one should always wear a double-stranded wooden kanthi around the neck and accept the niyams of satsang.",
      "gujaratiText": "Satsangno āsharo karī sadāy kanṭhne viṣhe kāṣhṭhnī bevaḍī māḷā dhāraṇ karavī tathā satsangnā niyamo dhāraṇ karavā.",
      "sanskritLippy": "Kāṣhṭha-jām dvi-guṇām mālām kaṇṭhe sadaiva dhārayet ।\\nSatsangam hi samāshritya satsanga-niyamāns-tathā ॥21॥",
      "audioURL1": "https://baps.box.com/shared/static/joxnhnji87oifd3mfszul2dcrka40jpu.mp3",
      "audioURL": "https://baps.box.com/shared/static/g8x7gljtl5g1nseko7sxboencavblnyl.mp3"
    },
    {
      "id": 18,
      "shlokas": "Shloka 22",
      "englishText": "In this world, brahmavidyā cannot be fully realized in life without the Brahmaswarup guru.",
      "gujaratiText": "Ā sansārmā brahmaswarūp guru vinā jīvanmā brahma-vidyāno tattve karīne sākṣhātkār na thaī shake.",
      "sanskritLippy": "Gurum Brahmaswarūpam tu vinā na sambhaved bhave ।\\nTattvato brahmavidyāyāh sākṣhātkāro hi jīvane ॥22॥",
      "audioURL1": "https://baps.box.com/shared/static/mye12pej046dbi9yw9ep0stvlo9ys8ig.mp3",
      "audioURL": "https://baps.box.com/shared/static/od8iq4fvkv91jx063v3xt3d4166y19yq.mp3"
    },
    {
      "id": 19,
      "shlokas": "Shloka 23",
      "englishText": "Without the Aksharbrahman guru, supreme, unwavering conviction (nishchay) in Paramatma cannot be attained and one’s ātmā also cannot acquire brahmabhāv.",
      "gujaratiText": "Akṣharbrahma guru vinā Paramātmāno uttam nirvikalp nishchay na thaī shake tathā potānā ātmāne viṣhe brahmabhāv paṇ prāpta na thaī shake.",
      "sanskritLippy": "Nottamo nirvikalpash-cha nishchayah Paramātmanaha ।\\nNa svātma-brahma-bhāvo’pi Brahmā’kṣharam gurum vinā ॥23॥",
      "audioURL1": "https://baps.box.com/shared/static/7kawvzm0kvdppzb4l5rc4gz57k0ykxs5.mp3",
      "audioURL": "https://baps.box.com/shared/static/7f9wftudrku8dsu1v22sb1ns6vicff73.mp3"
    },
    {
      "id": 20,
      "shlokas": "Shloka 24",
      "englishText": "Without the Brahmaswarup guru, perfect devotion also cannot be offered, ultimate bliss cannot be attained and the three types of misery also cannot be eradicated.",
      "gujaratiText": "Brahmaswarūp guru vinā yathārth bhakti paṇ na thaī shake, param ānandnī prāpti na thāy ane trividh tāpano nāsh paṇ na thāy.",
      "sanskritLippy": "Naivā’pi tattvato bhaktih paramānanda-prāpaṇam ।\\nNā’pi trividha-tāpānām nāsho Brahma-gurum vinā ॥24॥",
      "audioURL1": "https://baps.box.com/shared/static/hnj4nfy11aylt12yyrpi3tboy1fto11s.mp3",
      "audioURL": "https://baps.box.com/shared/static/jel4ebutiwn3bhja9rqyckdikgc6k6kj.mp3"
    },
    {
      "id": 21,
      "shlokas": "Shloka 25",
      "englishText": "Therefore, one should always take the refuge of the manifest Aksharbrahman guru, who enables one to attain all objectives and experience Paramatma.",
      "gujaratiText": "Āthī sarva arthnī siddhi kare tathā Paramātmāno anubhav karāve tevā pratyakṣh Akṣharbrahma guruno āsharo sadāy karavo.",
      "sanskritLippy": "Atah samāshrayen-nityam pratyakṣham Akṣharam gurum ।\\nSarva-siddhi-karam divyam Paramātmā’nubhāvakam ॥25॥",
      "audioURL1": "https://baps.box.com/shared/static/nfuj9ezitgw2b20fc4qytz7wighcxhe0.mp3",
      "audioURL": "https://baps.box.com/shared/static/r5q25i08ezfbeodtla7t4y7g0xkweplg.mp3"
    },
    {
      "id": 22,
      "shlokas": "Shloka 26",
      "englishText": "All satsangis should always renounce all harmful addictions, as addictions cause numerous illnesses and miseries.",
      "gujaratiText": "Sarva satsangīoe sarve durvyasanono sadāy tyāg karavo. Kāraṇ ke vyasan anek rogonu tathā dukhonu kāraṇ bane chhe.",
      "sanskritLippy": "Sarvam dur-vyasanam tyājyam sarvaih satsangibhih sadā ।\\nAneka-roga-dukhānām kāraṇam vyasanam yataha ॥26॥",
      "audioURL1": "https://baps.box.com/shared/static/gceg00vmhw4g8wm5m2su4xvdr2lbrdue.mp3",
      "audioURL": "https://baps.box.com/shared/static/0vfi4ilp79cspceh9w8hyo6jc2ehrhxo.mp3"
    },
    {
      "id": 23,
      "shlokas": "Shloka 27",
      "englishText": "One should never consume intoxicating substances, such as alcohol, bhang and tobacco. One should also refrain from smoking.",
      "gujaratiText": "Surā, bhāng tathā tamāku ityādi je je padārtho mādak hoy te kyārey khāvā ke pīvā nahī tathā dhūmra-pānno paṇ tyāg karavo.",
      "sanskritLippy": "Surā-bhangā-tamālādi yad yad bhaveddhi mādakam ।\\nTad bhakṣhayet piben-naiva dhūmra-pānam api tyajet ॥27॥",
      "audioURL1": "https://baps.box.com/shared/static/aa4xbmyrpdhfv9kgdllxw80rccfj642h.mp3",
      "audioURL": "https://baps.box.com/shared/static/u2gje5fnk6qm881sgb2c6rzjxdmigau3.mp3"
    },
    {
      "id": 24,
      "shlokas": "Shloka 28",
      "englishText": "All women and men should never engage in any form of gambling or adultery.",
      "gujaratiText": "Sarve strī tathā puruṣhoe sarva prakārnā jugārno tathā vyabhichārno tyāg karavo.",
      "sanskritLippy": "Pari-tyājyam sadā dyūtam sarvaih sarva-prakārakam ।\\nTyaktavyo vyabhichārash-cha nārībhih puruṣhais-tathā ॥28॥",
      "audioURL1": "https://baps.box.com/shared/static/gws7oxmhkr85nour7x23r2q4xngakotf.mp3",
      "audioURL": "https://baps.box.com/shared/static/3k0ii8tqc3ymaikyd2cwm9i9afx0y5kx.mp3"
    },
    {
      "id": 25,
      "shlokas": "Shloka 29",
      "englishText": "Satsangis should never eat meat, fish, eggs, onions, garlic or hing.",
      "gujaratiText": "Satsangī janoe kyārey māns, māchhalī, īnḍā tathā ḍungaḷī, lasaṇ, hing na khāvā.",
      "sanskritLippy": "Mānsam matsyam tathā’ṇḍāni bhakṣhayeyur na karhichit ।\\nPalāṇḍum lashunam hingu na cha satsangino janāhā ॥29॥",
      "audioURL1": "https://baps.box.com/shared/static/hsjxqnq7kydpdjxcjq6y2nlqsmiv4m31.mp3",
      "audioURL": "https://baps.box.com/shared/static/1zyx1i4gyg45ccq3ovfa7lo3pz7c8xzq.mp3"
    },
    {
      "id": 26,
      "shlokas": "Shloka 30",
      "englishText": "One should consume water, milk and other drinkable items [only] after they have been filtered. Food items and beverages that are forbidden should never be consumed.",
      "gujaratiText": "Pāṇī tathā dūdh ityādi peya padārtho gāḷelā grahaṇ karavā. Je khādya vastu tathā pīṇā ashuddha hoya te kyārey grahaṇ na karavā.",
      "sanskritLippy": "Pātavyam gālitam peyam jalam dugdhādikam tathā ।\\nKhādyam pānam ashuddham yad gṛahṇīyād vastu tan-nahi ॥30॥",
      "audioURL1": "https://baps.box.com/shared/static/b8v0vdqo7jekm0bgjfyg8irxxm3t4qda.mp3",
      "audioURL": "https://baps.box.com/shared/static/v5p9xfq7kw96fj2ifh7v8aab6k9b8n01.mp3"
    },
    {
      "id": 27,
      "shlokas": "Shloka 31",
      "englishText": "Satsangis should never steal. Even for the sake of dharma, one should never commit theft.",
      "gujaratiText": "Satsangīoe chorī kyārey na karavī. Dharmane arthe paṇ chorī kyārey na karavī.",
      "sanskritLippy": "Chauryam na karhichit kāryam satsangam āshritair janaihi ।\\nDharmārtham api no kāryam chora-kāryam tu karhichit ॥31॥",
      "audioURL1": "https://baps.box.com/shared/static/lw0y1xdgxo4aofi6rhzkktajp3cip0nr.mp3",
      "audioURL": "https://baps.box.com/shared/static/ui4v489vfwjhhlb74e84f1ph8wiwe64b.mp3"
    },
    {
      "id": 28,
      "shlokas": "Shloka 32",
      "englishText": "One should never take even objects such as flowers or fruits without the consent of their owners. Taking without consent is a subtle form of theft.",
      "gujaratiText": "Puṣhp, faḷo jevī vastu paṇ tenā dhaṇīnī paravāngī vagar na levī. Paravāngī vagar levu te sūkṣhma chorī kahevāy chhe.",
      "sanskritLippy": "Naivā’nya-svāmikam grāhyam tad-anugnām vinā svayam ।\\nPuṣhpa-falādyapi vastu sūkṣhma-chauryam tad uchyate ॥32॥",
      "audioURL1": "https://baps.box.com/shared/static/v0tmm8hr4he1nw6aiigkz33l8txh5tnr.mp3",
      "audioURL": "https://baps.box.com/shared/static/8m5xdnqjddles9tftn4mxdhv4qu3i929.mp3"
    },
    {
      "id": 29,
      "shlokas": "Shloka 33-34",
      "englishText": "One should never kill humans, animals, birds and bugs or other insects and creatures. The Shrutis, Smrutis and other sacred texts clearly describe non-violence as the highest dharma and violence as adharma.",
      "gujaratiText": "Kyārey manuṣhya, pashu, pakṣhī, tathā mānkaḍ ādik koī paṇ jīv-jantuonī hinsā na karavī. Ahinsā param dharma chhe, hinsā adharma chhe em Shruti-Smṛutyādi shāstromā spaṣhṭa kahevāmā āvyu chhe.",
      "sanskritLippy": "Manuṣhyāṇām pashūnām vā matkuṇādesh-cha pakṣhiṇām ।\\nKeṣhānchij-jīva-jantūnām hinsā kāryā na karhichit ॥33॥\\nAhinsā paramo dharmo hinsā tvadharma-rūpiṇī ।\\nShruti-smṛutyādi-shāstreṣhu sfuṭam evam prakīrtitam ॥34॥",
      "audioURL1": "https://baps.box.com/shared/static/4r3negbs1pvp6eg32vawts5yslzlq9as.mp3",
      "audioURL": "https://baps.box.com/shared/static/3fbrlpf2idjybwd7xqj1o6m4ly5xnzr9.mp3"
    },
    {
      "id": 30,
      "shlokas": "Shloka 35",
      "englishText": "Even for a yagna, satsangis should never harm goats or any other innocent animals.",
      "gujaratiText": "Satsangīoe yagnane arthe paṇ bakarā vagere nirdoṣh prāṇīonī hinsā kyārey na ja karavī.",
      "sanskritLippy": "Yāgārtham apyajādīnām nirdoṣhāṇām hi prāṇinām ।\\nHinsanam naiva kartavyam satsangibhihi kadāchana ॥35॥",
      "audioURL1": "https://baps.box.com/shared/static/piqj5q7ijr7pvggf2j70h3oxy577nbxo.mp3",
      "audioURL": "https://baps.box.com/shared/static/5jiq84wqkey8vh1wsc45inttec1nikmx.mp3"
    },
    {
      "id": 31,
      "shlokas": "Shloka 36",
      "englishText": "When yagnas are held, they should only be conducted without harming any beings and according to the Sampraday’s principles.",
      "gujaratiText": "Yāgādi karavānā thāy tyāre sampradāynā siddhāntne anusarīne hinsā-rahit ja karavā.",
      "sanskritLippy": "Yāgādike cha kartavye siddhāntam sāmpradāyikam ।\\nAnusṛutya hi kartavyam hinsā-rahitam eva tat ॥36॥",
      "audioURL1": "https://baps.box.com/shared/static/fietaxv06shkun320we9i8ogk25gxvty.mp3",
      "audioURL": "https://baps.box.com/shared/static/30af8oiovirkoccibylapku4jeb1l2tv.mp3"
    },
    {
      "id": 32,
      "shlokas": "Shloka 37",
      "englishText": "Satsangis should never eat meat, even if it is considered to be the remnant of a yagna or sanctified by the deities.",
      "gujaratiText": "Yagnano sheṣh gaṇīne ke pachhī devatānā naivedya rūpe paṇ satsangīoe kyārey māns na ja khāvu.",
      "sanskritLippy": "Matvā’pi yagna-sheṣham cha vā’pi deva-niveditam ।\\nMānsam kadāpi bhakṣhyam na satsangam āshritair-janaihi ॥37॥",
      "audioURL1": "https://baps.box.com/shared/static/49ly89fwm6f3gyrqy6whs1oij4x2ba2c.mp3",
      "audioURL": "https://baps.box.com/shared/static/wcztrhbvycee7cya6d8032u4hh7pybks.mp3"
    },
    {
      "id": 33,
      "shlokas": "Shloka 38",
      "englishText": "One should never strike another person. One should not swear, insult or commit other forms of subtle harm or injury.",
      "gujaratiText": "Koīnu tāḍan kyārey na karavu. Apshabdo kahevā, apamān karavu ityādi koīpaṇ prakāre sūkṣhma hinsā paṇ na karavī.",
      "sanskritLippy": "Kasyā’pi tāḍanam naiva karaṇīyam kadāchana ।\\nApa-shabdā’pamānādi-sūkṣhma-hinsā’pi naiva cha ॥38॥",
      "audioURL1": "https://baps.box.com/shared/static/ef1fiyr2iist2txm4y2jb98ajykkkc3v.mp3",
      "audioURL": "https://baps.box.com/shared/static/ge42v23jq6d2jtccossz9avkvkfwvrgf.mp3"
    },
    {
      "id": 34,
      "shlokas": "Shloka 39",
      "englishText": "One should not commit violence to attain wealth, power, prestige or [to fulfil one’s desire] for a man or woman or anything else. Also, one should also not commit violence out of ego, jealousy or anger.",
      "gujaratiText": "Dhan, sattā, kīrti, strī, puruṣh ityādinī prāptine arthe tathā mān, īrṣhyā ke krodhe karīne paṇ hinsā na karavī.",
      "sanskritLippy": "Sattā-kīrti-dhana-dravya-strī-puruṣhādikā’ptaye ।\\nMānerṣhyā-krodhatash-chā’pi hinsām naiva samācharet ॥39॥",
      "audioURL1": "https://baps.box.com/shared/static/k5syw842qy7ahcbnuthg9ci32l5pgyzn.mp3",
      "audioURL": "https://baps.box.com/shared/static/eicrfac18tavwh3dhija13qh05aq86v2.mp3"
    },
    {
      "id": 35,
      "shlokas": "Shloka 40",
      "englishText": "Inflicting mental, verbal or physical violence pains Swaminarayan Bhagwan, who resides within that person.",
      "gujaratiText": "Mane karīne, vachane karīne ke karme karīne hinsā karavāthī tenāmā rahelā Swāminārāyaṇ Bhagwān dukhāy chhe.",
      "sanskritLippy": "Manasā vachasā vā’pi karmaṇā hinsane kṛute ।\\nTat-sthito dukhyate nūnam Swāminārāyaṇo Harihi ॥40॥",
      "audioURL1": "https://baps.box.com/shared/static/fr3ma855kf7or6h6sk7m051pa4eiurew.mp3",
      "audioURL": "https://baps.box.com/shared/static/eivcm7opimuozo4yiggfrzfyfx0oj06a.mp3"
    },
    {
      "id": 36,
      "shlokas": "Shloka 41",
      "englishText": "Suicide is also a form of violence. Therefore, never commit suicide by falling from heights, hanging oneself, consuming poison or any other means.",
      "gujaratiText": "Ātma-hatyā karavī te paṇ hinsā ja chhe. Āthī paḍatu mūkavu, gaḷe ṭūnpo khāvo, zer khāvu ityādi koī rīte ātma-hatyā kyārey na karavī.",
      "sanskritLippy": "Ātma-ghāto’pi hinsaiva na kāryo’tah kadāchana ।\\nPatana-gala-bandhādyair viṣha-bhakṣhādibhis-tathā ॥41॥",
      "audioURL1": "https://baps.box.com/shared/static/9hdmd5p4kv9s0migq5qaxv6kc0hqcx05.mp3",
      "audioURL": "https://baps.box.com/shared/static/84mo7yuq1w8yx8701h325s6qgdm4j375.mp3"
    },
    {
      "id": 37,
      "shlokas": "Shloka 42",
      "englishText": "No one should kill oneself or others out of grief, shame, fear, anger or due to illness and other adversities, not even for the sake of dharma.",
      "gujaratiText": "Dukh, lajjā, bhay, krodh tathā rog ityādi āpattine kāraṇe, ke pachhī dharmane arthe paṇ koīe potānī ke anyanī hatyā na karavī.",
      "sanskritLippy": "Dukha-lajjā-bhaya-krodha-rogādyāpatti kāraṇāt ।\\nDharmā’rtham api kashchiddhi hanyān-na swam na vā param ॥42॥",
      "audioURL1": "https://baps.box.com/shared/static/y7x6v6rc0z92itt2ro1dvrvywb6zjj6r.mp3",
      "audioURL": "https://baps.box.com/shared/static/x7ptc5lsrf0tml3b64a7m7uvbcgdx96k.mp3"
    },
    {
      "id": 38,
      "shlokas": "Shloka 43",
      "englishText": "A mumukshu should never commit suicide even at a place of pilgrimage. One should never commit suicide at pilgrimage places even with the hope of attaining moksha or merits.",
      "gujaratiText": "Mumukṣhue tīrthane viṣhe paṇ ātma-hatyā na ja karavī. Mokṣha ke puṇya pāmavānī bhāvanāthī paṇ tīrthane viṣhe āpghāt na ja karavo.",
      "sanskritLippy": "Tīrthe’pi naiva kartavya ātma-ghāto mumukṣhubhihi ।\\nNaivā’pi mokṣha-puṇyāpti bhāvāt kāryah sa tatra cha ॥43॥",
      "audioURL1": "https://baps.box.com/shared/static/ptaakh2nmo6ji3ar52ivxb0pjst5blyd.mp3",
      "audioURL": "https://baps.box.com/shared/static/pw4dhwbs0scycujp51yrxe4ge9dhgk6p.mp3"
    },
    {
      "id": 39,
      "shlokas": "Shloka 44",
      "englishText": "Bhagwan is the all-doer, compassionate and the protector of all; at all times, he alone is the resolver of all my adversities.",
      "gujaratiText": "Bhagwān sarva-kartā chhe, dayāḷu chhe, sarvanu rakṣhaṇ karanārā chhe ane e ja sadā mārā sarve sankaṭonā ṭāḷanārā chhe.",
      "sanskritLippy": "Bhagavān sarva-kartā’sti dayāluh sarva-rakṣhakaha ।\\nSa eva nāshakah sarva-sankaṭānām sadā mama ॥44॥",
      "audioURL1": "https://baps.box.com/shared/static/lam4hhi8uwqbzz70emuosmjpot93gs3u.mp3",
      "audioURL": "https://baps.box.com/shared/static/ypu00hcyxtjvaeqawww15bcvf4vto49m.mp3"
    },
    {
      "id": 40,
      "shlokas": "Shloka 45",
      "englishText": "Whatever Bhagwan does is always beneficial. His wish alone is my prārabdh. He alone is my liberator.",
      "gujaratiText": "Bhagwān je kare te sadāy sārā māṭe hoy. Temanī ichchhā e ja māru prārabdha chhe. Teo ja mārā tārak chhe.",
      "sanskritLippy": "Bhagavān kurute yaddhi hitārtham eva tat sadā ।\\nPrārabdham me tad ichchhaiva sa eva tārako mama ॥45॥",
      "audioURL1": "https://baps.box.com/shared/static/eik3aja3zuap723lvgy27uux5sxj7k8d.mp3",
      "audioURL": "https://baps.box.com/shared/static/f9omnnc675yjipqqn7fcnm63dcegg47t.mp3"
    },
    {
      "id": 41,
      "shlokas": "Shloka 46",
      "englishText": "My hindrances, sins, flaws and bad qualities will certainly be destroyed. I will surely attain peace, supreme bliss and happiness.",
      "gujaratiText": "Mārā vighno, pāp, doṣh tathā durguṇo avashya nāsh pāmashe. Hu avashya shānti, param ānand ane sukh pāmīsh.",
      "sanskritLippy": "Nūnam nankṣhyanti me vighnāh pāpa-doṣhāsh-cha dur-guṇāhā ।\\nNūnam prāpsyāmyaham shāntim ānandam paramam sukham ॥46॥",
      "audioURL1": "https://baps.box.com/shared/static/dubatq8s191fpxzkcw3gzm30lewfhjrp.mp3",
      "audioURL": "https://baps.box.com/shared/static/dzh4uo164gc0nv4txw9hn0t80s6nskck.mp3"
    },
    {
      "id": 42,
      "shlokas": "Shloka 47",
      "englishText": "This is because I have attained the manifest form of Akshar- Purushottam Maharaj. With his strength, I will surely overcome misery.",
      "gujaratiText": "Kāraṇ ke mane sākṣhāt Akṣhar-Puruṣhottam Mahārāj maḷyā chhe. Temanā baḷe hu jarūr dukhne tarī jaīsh.",
      "sanskritLippy": "Yato mām militah sākṣhād Akṣhara-Puruṣhottamaha ।\\nNishchayena tariṣhyāmi dukha-jātam hi tad balāt ॥47॥",
      "audioURL1": "https://baps.box.com/shared/static/zzo6nnc68mto11jzlhkil1eipi3ga5ot.mp3",
      "audioURL": "https://baps.box.com/shared/static/s2cxvzv0b9k91q4ebvc67i6yb4lavnmf.mp3"
    },
    {
      "id": 43,
      "shlokas": "Shloka 48",
      "englishText": "With the strength of such thoughts, a devotee who has taken refuge never loses courage and remains joyous due to the strength of Bhagwan.",
      "gujaratiText": "Ā rīte vichārnu baḷ rākhī āshrit bhakta kyārey himmat na hāre ane Bhagwānnā baḷe ānandmā rahe.",
      "sanskritLippy": "Vichāryaivam balam rakṣhed nā’shrito nirbalo bhavet ।\\nĀnandito bhaven-nityam Bhagavad bala vaibhavāt ॥48॥",
      "audioURL1": "https://baps.box.com/shared/static/0wuxuava8d4ja1l48clxec3d92v0ee2k.mp3",
      "audioURL": "https://baps.box.com/shared/static/5gocsew3xfaw023hk7wic61fzgt1880u.mp3"
    },
    {
      "id": 44,
      "shlokas": "Shloka 49",
      "englishText": "One should never spit, urinate or defaecate in places prohibited by the shastras and society.",
      "gujaratiText": "Shāstramā tathā lokmā niṣhedh karyo hoy tevā sthānone viṣhe kyārey thūnkavu nahī tathā maḷ-mūtrādi na karavu.",
      "sanskritLippy": "Ṣhṭhīvanam mala-mūtrādi-visarjanam sthaleṣhu cha ।\\nShāstra-loka-niṣhiddheṣhu na kartavyam kadāchana ॥49॥",
      "audioURL1": "https://baps.box.com/shared/static/wt0ztvt693cc12tpu76s5rk3dg48qb7n.mp3",
      "audioURL": "https://baps.box.com/shared/static/66pllxfh30d2tz714n8s8rsnn0usogeo.mp3"
    },
    {
      "id": 45,
      "shlokas": "Shloka 50",
      "englishText": "One should observe all forms of external and internal purity. Shri Hari loves purity and is pleased with those who are pure.",
      "gujaratiText": "Bāhya ane āntarik em sarva prakārnī shuddhinu pālan karavu. Shrīharine shuddhi priya chhe ane shuddhivāḷā manuṣhyanī upar teo prasanna thāy chhe.",
      "sanskritLippy": "Shuddhih sarvavidhā pālyā bāhyā chā’bhyantarā sadā ।\\nShuddhi-priyah prasīdech-cha shuddhi-mati jane Harihi ॥50॥",
      "audioURL1": "https://baps.box.com/shared/static/0ynd4kmdsnv4ksnvvilk7yl9mgvg8vh6.mp3",
      "audioURL": "https://baps.box.com/shared/static/wbcygbabb0zev6yx5ogxrm44zyi69v4a.mp3"
    },
    {
      "id": 46,
      "shlokas": "Shloka 51",
      "englishText": "Satsangis should always wake up before sunrise. After bathing and other morning routines, they should put on clean clothes.",
      "gujaratiText": "Satsangīoe sadā sūrya ūgyā pūrve jāgavu. Tyār bād snānādik karī shuddha vastro dhāraṇ karavā.",
      "sanskritLippy": "Satsangibhih praboddhavyam pūrvam sūryodayāt sadā ।\\nTatah snānādikam kṛutvā dhartavyam shuddha vastrakam ॥51॥",
      "audioURL1": "https://baps.box.com/shared/static/6qxdiiz0c6ahin57k9y4e6xq8pw9401e.mp3",
      "audioURL": "https://baps.box.com/shared/static/6rcrc7tefgduvuein7n48pib7h5thfq7.mp3"
    },
    {
      "id": 47,
      "shlokas": "Shloka 52",
      "englishText": "Thereafter, one should sit on a clean āsan and perform personal daily puja facing east or north.",
      "gujaratiText": "Tyār bād pūrva dishāmā athavā uttar dishāmā mukh rākhī, shuddha āsan upar besī nitya-pūjā karavī.",
      "sanskritLippy": "Pūrvasyām uttarasyām vā dishi kṛutvā mukham tataha ।\\nShuddhā’sanopaviṣhṭah san-nitya-pūjām samācharet ॥52॥",
      "audioURL1": "https://baps.box.com/shared/static/pqmq1p3ykm9sk321v7wgytcz7j4n3jro.mp3",
      "audioURL": "https://baps.box.com/shared/static/ftt255cfz377d17wkagoryt7ta0l9b1e.mp3"
    },
    {
      "id": 48,
      "shlokas": "Shloka 53-54",
      "englishText": "While chanting the Swaminarayan mantra and remembering the guru, apply a Ushaped tilak made from chandan that has been sanctified by having been offered to Bhagwan and a Kumkum chandlo to the forehead. One should also apply a tilak-chandlo of chandan to the chest and both arms.",
      "gujaratiText": "Swāminārāyaṇ mantrano jāp karatā tathā gurunu smaraṇ karatā karatā bhālne viṣhe Bhagwānnī pūjāthī prasādībhūt thayel chandan vaḍe ūrdhva-punḍra tilak karavu ane kumkum vaḍe chāndalo karavo tathā chhātī ane banne bhujāo par chandanthī tilak-chāndalo karavo.",
      "sanskritLippy": "Prabhu-pūjopa-yuktena chandanenordhva puṇḍrakam ।\\nBhāle hi tilakam kuryāt kumkumena cha chandrakam ॥53॥\\nUrasi hastayosh-chandram tilakam chandanena cha ।\\nSwāminārāyaṇam mantram japan kuryād gurum smaran ॥54॥",
      "audioURL1": "https://baps.box.com/shared/static/oftmj1vdceo5bpc7dhstofycvuyxr19o.mp3",
      "audioURL": "https://baps.box.com/shared/static/o9qpzfkc0b8avplc5jaerh4fv3aaabfx.mp3"
    },
    {
      "id": 49,
      "shlokas": "Shloka 55",
      "englishText": "While remembering Bhagwan and the guru, women should imprint only a Kumkum chandlo to their foreheads. They should not apply a tilak.",
      "gujaratiText": "Strīoe Bhagwān tathā gurunu smaraṇ karatā bhālne viṣhe kevaḷ kumkumno chāndalo karavo. Tilak na karavu.",
      "sanskritLippy": "Kevalam chandrakah strībhih kartavyas-tilakam na hi ।\\nKumkuma dravyato bhāle smarantībhir harim gurum ॥55॥",
      "audioURL1": "https://baps.box.com/shared/static/9duhz55nu52ghep36ppzzqwzim333ia4.mp3",
      "audioURL": "https://baps.box.com/shared/static/e13nn8s5thau55bho334o7cakbcvlufh.mp3"
    },
    {
      "id": 50,
      "shlokas": "Shloka 56-58",
      "englishText": "Thereafter, to gain the privilege to perform puja, a devotee who has taken the refuge of satsang should meditate on their ātmā while contemplating upon the glory of Bhagwan. The sacred mantra ‘Aksharam-aham Purushottam-dāso’smi’ should be recited with joy and devotion. One should identify one’s ātmā with Aksharbrahman and perform mānsi puja with a calm and focused mind.",
      "gujaratiText": "Tyār bād satsangne āshrit bhakte pūjānā adhikār māṭe Bhagwānnā pratāpnu chintavan karatā karatā ātma-vichār karavo. Prasanna chitte ane bhakti-bhāv-pūrvak ‘Akṣharam aham Puruṣhottama-dāsosmi’ e pavitra mantranu uchchāraṇ karavu. Potānā ātmāne viṣhe Akṣharbrahmanī vibhāvanā karavī ane shānt thaī, ekāgra chitte mānasī pūjā karavī.",
      "sanskritLippy": "Tatah pūjā’dhikārāya bhaktah satsangam āshritaha ।\\nKuryād ātma-vichāram cha pratāpam chintayan harehe ॥56॥\\nAkṣharam-aham ityevam bhaktyā prasanna chetasā ।\\nPuruṣhottama dāso’smi mantram etam vadech-chhuchim ॥57॥\\nAkṣharabrahma rūpatvam svasyā’tmani vibhāvayet ।\\nKuryāch-cha mānasīm pūjām shānta ekāgra chetasā ॥58॥",
      "audioURL1": "https://baps.box.com/shared/static/9s5yey2pxyi4slk473qmu62b9rlbbyz3.mp3",
      "audioURL": "https://baps.box.com/shared/static/wnjteqn9r9juctm5do1ace0t0gszfgzl.mp3"
    },
    {
      "id": 51,
      "shlokas": "Shloka 59",
      "englishText": "Only Bhagwan and the Brahmaswarup guru can bestow moksha. Therefore, one should only meditate upon them and perform their mānsi puja.",
      "gujaratiText": "Bhagwān ane brahmaswarūp guru ja mokṣha-dātā chhe. Temanā ja dhyān tathā mānasī pūjā karavā.",
      "sanskritLippy": "Harir Brahma-gurush-chaiva bhavato mokṣha-dāyakau ।\\nTayor eva hi kartavyam dhyānam mānasa-pūjanam ॥59॥",
      "audioURL1": "https://baps.box.com/shared/static/naia2ugubi9wo47saw3zu26ylvn75m2t.mp3",
      "audioURL": "https://baps.box.com/shared/static/8yw1vf5bblg12hzpw5zs7gcaana9kyo8.mp3"
    },
    {
      "id": 52,
      "shlokas": "Shloka 60",
      "englishText": "Thereafter, devoutly place the pictorial murtis on a clean cloth in a way that one can easily do their darshan.",
      "gujaratiText": "Tyār bād pavitra vastra upar chitra-pratimāonu sārī rīte darshan thāy tem bhakti-bhāv-pūrvak sthāpan karavu.",
      "sanskritLippy": "Sthāpayech-chitra-mūrtīsh-cha shuchi vastropari tataha ।\\nDarshanam syād yathā samyak tathā hi bhakti-bhāvataha ॥60॥",
      "audioURL1": "https://baps.box.com/shared/static/5hkyums8im3hrs1gc03opugzmcjgayf8.mp3",
      "audioURL": "https://baps.box.com/shared/static/gq9tdmwgm6yz3v132q7yl3p0a09wtiu4.mp3"
    },
    {
      "id": 53,
      "shlokas": "Shloka 61",
      "englishText": "In the centre, one should arrange the murtis of Akshar and Purushottam, that is, Gunatitanand Swami and the one who transcends him, [Shriji] Maharaj.",
      "gujaratiText": "Temā madhyamā Akṣhar tathā Puruṣhottamnī mūrti padharāvavī eṭale ke Guṇātītānand Swāmī tathā temanāthī par evā Mahārājne padharāvavā.",
      "sanskritLippy": "Madhye tu sthāpayet tatra hyakṣhara-Puruṣhottamau ।\\nSwāminam hi Guṇātītam Mahārājam cha tat param ॥61॥",
      "audioURL1": "https://baps.box.com/shared/static/m75hbq1gmzl1y9fys5qv65h8ccq5498u.mp3",
      "audioURL": "https://baps.box.com/shared/static/a1vpe6ihrimjzcx745zxst2lzgl7vohu.mp3"
    },
    {
      "id": 54,
      "shlokas": "Shloka 62",
      "englishText": "One should then place the murtis of each guru up to Pramukh Swami Maharaj and the murtis of the gurus whom one has personally served.",
      "gujaratiText": "Tyār bād Pramukh Swāmī Mahārāj paryant pratyek guruonī mūrtio padharāvavī tathā pote pratyakṣh sevyā hoya te guruonī mūrtio padharāvavī.",
      "sanskritLippy": "Pramukha-Swāmi-paryantam pratyeka-guru-mūrtayaha ।\\nPrasthāpyāh sevitānām cha pratyakṣham mūrtayah svayam ॥62॥",
      "audioURL1": "https://baps.box.com/shared/static/3a8815te7fik2vi85eevkiuh3zog0q9m.mp3",
      "audioURL": "https://baps.box.com/shared/static/p7or5jn5z8vuvc3hvk8ckblso7nd2qhq.mp3"
    },
    {
      "id": 55,
      "shlokas": "Shloka 63",
      "englishText": "Thereafter, one should invite [Shriji] Maharaj and the gurus by reciting the Ahvan Mantra. One should bow with folded hands and with dāsbhāv.",
      "gujaratiText": "Tyār bād āhvān shlok bolīne Mahārāj tathā Guruonu āhvān karavu. Be hāth joḍī dāsbhāve namaskār karavā.",
      "sanskritLippy": "Āhvāna-shlokam uchchārya Harim cha gurum āhvayet ।\\nHastau baddhvā namaskāram kuryāddhi dāsa-bhāvataha ॥63॥",
      "audioURL1": "https://baps.box.com/shared/static/nm4kjyshura605l8rnhmz9j8xprdc8b6.mp3",
      "audioURL": "https://baps.box.com/shared/static/oe21z77zmrjdbwxm2xeu9w3p9roj927n.mp3"
    },
    {
      "id": 56,
      "shlokas": "Shloka 64-65",
      "englishText": "The meaning of this mantra is as follows:\\n“O Sahajanand Shri Hari! O Purushottam! O Aksharbrahman Gunatit gurus! Please shower compassion [upon me] and awaken. Please come forth from my ātmā, to accept my puja. I become more blessed due to your divine presence and darshan.”",
      "gujaratiText": "Āhvān mantra ā pramāṇe chhe:\\nUttiṣhṭha Sahajānanda Shrī-Hare Puruṣhottama ।\\nGuṇātītākṣhara brahmann-uttiṣhṭha kṛupayā guro ॥\\nĀgamyatām hi pūjārtham āgamyatām mad-ātmatah ।\\nSānnidhyād darshanād divyāt saubhāgyam vardhate mama ॥",
      "sanskritLippy": "Āhvāna-mantrash-chaivam vidhaha:\\nUttiṣhṭha Sahajānanda Shrī-Hare Puruṣhottama ।\\nGuṇātītā’kṣhara Brahmann-uttiṣhṭha kṛupayā guro ॥64॥\\nĀgamyatām hi pūjārtham āgamyatām mad-ātmataha ।\\nSānnidhyād darshanād divyāt saubhāgyam vardhate mama ॥65॥",
      "audioURL1": "https://baps.box.com/shared/static/46ohjxe4y1amx66y09eq0ctmfgpqqs1p.mp3",
      "audioURL": "https://baps.box.com/shared/static/jp3ffndpefr5x05fkpdi7k7qoerbezed.mp3"
    },
    {
      "id": 57,
      "shlokas": "Shloka 66-67",
      "englishText": "Thereafter, with mahimā and a steady mind, one should perform mālā while chanting the Swaminarayan mantra and having darshan of the murtis. Afterwards, while continuing to do darshan of the murtis, one should stand on one leg with arms raised and perform tapni mālā.",
      "gujaratiText": "Tyār bād sthir chitte tathā mahimā sāthe mūrtionā darshan karatā karatā Swāminārāyaṇ mantrano jāp karatā māḷā feravavī. Tyār bād ek page ūbhā rahī, hāth ūnchā rākhī mūrtionā darshan karatā tapnī māḷā feravavī.",
      "sanskritLippy": "Mālām āvartayed mantram Swāminārāyaṇam japan ।\\nMahimnā darshanam kurvan mūrtīnām sthira-chetasā ॥66॥\\nEka-pādotthito bhūtvā mālām āvartayet tataha ।\\nTapasa ūrdhva-hastah san kurvāṇo mūrti-darshanam ॥67॥",
      "audioURL1": "https://baps.box.com/shared/static/8s2330a2m5hw1kcjc1dj41id3ygetu62.mp3",
      "audioURL": "https://baps.box.com/shared/static/0hrqxqiwgyb70fd7g6eoe3w6edsgrj98.mp3"
    },
    {
      "id": 58,
      "shlokas": "Shloka 68",
      "englishText": "One should then perform pradakshinās of the murtis while contemplating upon Akshar-Purushottam Maharaj, who is pervasive and the focus of all.",
      "gujaratiText": "Tyār bād sarvanā kendra samān ane vyāpak evā Akṣhar-Puruṣhottam Mahārājne sambhāratā pratimāonī pradakṣhiṇā karavī.",
      "sanskritLippy": "Tatah sanchintayan kuryād Akṣhara-Puruṣhottamam ।\\nVyāpakam sarva kendram cha pratimānām pradakṣhiṇāhā ॥68॥",
      "audioURL1": "https://baps.box.com/shared/static/osse0xrib4pps2y8z38v6dd14781ki5u.mp3",
      "audioURL": "https://baps.box.com/shared/static/k7q58och6m3mmy1zak7s8ri8sbpcpgyg.mp3"
    },
    {
      "id": 59,
      "shlokas": "Shloka 69",
      "englishText": "Thereafter, with dāsbhāv, males should perform sāshtāng dandvat pranāms and females should sit and offer panchāng pranāms.",
      "gujaratiText": "Tyār bād dāsbhāve puruṣhoe sāṣhṭāng danḍavat praṇām karavā ane strīoe besīne panchāng praṇām karavā.",
      "sanskritLippy": "Sāṣhṭāngā daṇḍavat kāryāh praṇāmāh puruṣhais-tatah ।\\nNārībhis-tūpavishyaiva panchāngā dāsa-bhāvataha ॥69॥",
      "audioURL1": "https://baps.box.com/shared/static/oiiaiyjudgiygcp5k4pq2dszha4i65r1.mp3",
      "audioURL": "https://baps.box.com/shared/static/jf4j26a0f9l3rg8ty6kxqsk085je7xsy.mp3"
    },
    {
      "id": 60,
      "shlokas": "Shloka 70",
      "englishText": "One should perform an additional dandvat pranām every day to seek forgiveness for hurting or harbouring ill-will towards another devotee.",
      "gujaratiText": "Koī bhaktano droh thayo hoy tenā nivāraṇne arthe kṣhamā-yāchanā-pūrvak pratidin ek danḍavat praṇām adhik karavo.",
      "sanskritLippy": "Praṇāmo daṇḍavach-chaikah kṣhamā-yāchana-pūrvakam ।\\nBhakta-droha-nivārārtham kāryo’dhiko hi pratyaham ॥70॥",
      "audioURL1": "https://baps.box.com/shared/static/4015mxivrlfp5lj8n0blmbjin021bqmn.mp3",
      "audioURL": "https://baps.box.com/shared/static/x65ep1hk7ui4m03uswbu8fzmbwaudcsh.mp3"
    },
    {
      "id": 61,
      "shlokas": "Shloka 71",
      "englishText": "Then, to fulfil one’s noble wishes, one should pray with divyabhāv and devotion while chanting the Swaminarayan mantra (dhun).",
      "gujaratiText": "Tyār bād Swāminārāyaṇ mantrano jap karatā shubh sankalponī pūrti māṭe divyabhāv ane bhaktie sahit prārthanā (dhūn) karavī.",
      "sanskritLippy": "Divya-bhāvena bhaktyā cha tad-anu prārthayej-japan ।\\nSwāminārāyaṇam mantram shubha-sankalpa-pūrtaye ॥71॥",
      "audioURL1": "https://baps.box.com/shared/static/pyi8ilqluvmwy6ho7n5ssaiprg48x0jf.mp3",
      "audioURL": "https://baps.box.com/shared/static/9bx4m100i7v8km24zvicgq1pfed3nsxf.mp3"
    },
    {
      "id": 62,
      "shlokas": "Shloka 72",
      "englishText": "After devoutly performing puja in this way, one should re-install Akshar-Purushottam Maharaj within one’s ātmā by reciting the Punaragaman Mantra.",
      "gujaratiText": "Ā rīte bhakti-bhāve pūjā karīne punarāgaman mantrathī Akṣhar-Puruṣhottam Mahārājne potānā ātmāne viṣhe padharāvavā.",
      "sanskritLippy": "Bhaktitah pūjayitvaivam Akṣhara-Puruṣhottamam ।\\nPunar-āgama-mantreṇa prasthāpayen-nijātmani ॥72॥",
      "audioURL1": "https://baps.box.com/shared/static/s0rmxwb79u6tmdhyz0fsfc2di384riqz.mp3",
      "audioURL": "https://baps.box.com/shared/static/byy49vhtbls7wmn8fe42m2v8gs1hgwtj.mp3"
    },
    {
      "id": 63,
      "shlokas": "Shloka 73",
      "englishText": "The meaning of this mantra is as follows:\\n“O Purushottam Narayan together with Aksharbrahman! I have performed your puja with devotion and divyabhāv. Now, please reside within my ātmā.”",
      "gujaratiText": "Punarāgaman mantra ā pramāṇe chhe:\\nBhaktyaiva divy-abhāvena pūjā te sam-anuṣhṭhitā ।\\nGachchhātha tvam madātmānam Akṣhara-Puruṣhottama ॥",
      "sanskritLippy": "Punar-āgamana-mantrash-chaivam vidhaha:\\nBhaktyaiva divya-bhāvena pūjā te samanuṣhṭhitā ।\\nGachchhā’tha tvam mad-ātmānam Akṣhara-Puruṣhottama ॥73॥",
      "audioURL1": "https://baps.box.com/shared/static/h9jkei86p01b7pxs007c10l31xii03mm.mp3",
      "audioURL": "https://baps.box.com/shared/static/lcjogs4fi32sydm0kyapxy8k2udr3yus.mp3"
    },
    {
      "id": 64,
      "shlokas": "Shloka 74",
      "englishText": "To strengthen one’s satsang, one should then daily read shastras that encompass the teachings and instructions of Shri Hari and the gurus.",
      "gujaratiText": "Tyār bād satsangnī dṛuḍhatā māṭe jemā Shrīhari tathā gurunā updesho ane ādesho samāyā hoya tevā shāstranu roj vānchan karavu.",
      "sanskritLippy": "Tatah satsanga-dārḍhyāya shāstram paṭhyam cha pratyaham ।\\nĀdeshāsh-chopadeshāsh-cha yatra santi Harer guroho ॥74॥",
      "audioURL1": "https://baps.box.com/shared/static/cpghsokwilc3ae94tmcxofu83yi4vp9j.mp3",
      "audioURL": "https://baps.box.com/shared/static/e8oiwu6k3vk0kemmcz0xmlkik9ekefai.mp3"
    },
    {
      "id": 65,
      "shlokas": "Shloka 75",
      "englishText": "Thereafter, one should bow to devotees with reverence and humility. Only after performing puja in this way should one engage in one’s daily activities.",
      "gujaratiText": "Tyār bād ādar ane namrabhāve bhaktone praṇām karavā. Ā rīte pūjā karīne pachhī ja potānā vyavahārnu kārya karavu.",
      "sanskritLippy": "Tad-anu praṇamed bhaktān ādarān-namra-bhāvatah ।\\nEvam pūjām samāpyaiva kuryāt sva-vyāvahārikam ॥75॥",
      "audioURL1": "https://baps.box.com/shared/static/gfwnosbohcvik1qrws9xb2xbkre6x4ts.mp3",
      "audioURL": "https://baps.box.com/shared/static/0sdlhe0mg1a9jg0ibtsjmi6ynjmlbhl6.mp3"
    },
    {
      "id": 66,
      "shlokas": "Shloka 76",
      "englishText": "One should not eat food or even drink water or other liquids without performing puja. One should not give up one’s puja even during outings.",
      "gujaratiText": "Pūjā karyā vinā jamavu nahī ne pāṇī vagere paṇ na pīvu. Pravāse gayā hoīe to paṇ pūjāno tyāg na karavo.",
      "sanskritLippy": "Bhojyam naiva na peyam vā vinā pūjām jalādikam ।\\nPravāsa-gamane chā’pi pūjām naiva pari-tyajet ॥76॥",
      "audioURL1": "https://baps.box.com/shared/static/qgy2q0yg60s2i2pb2i36ejaz0wcg8pb1.mp3",
      "audioURL": "https://baps.box.com/shared/static/zwkmxqgnszxlzkkbn0cuoth69b8c7cb8.mp3"
    },
    {
      "id": 67,
      "shlokas": "Shloka 77",
      "englishText": "If one is incapable of doing puja because of old age, illness or other difficulties, one should have one’s puja performed by another.",
      "gujaratiText": "Vṛuddhāvasthā, rogādi tathā anya āpattine līdhe pote pūjā karavā asamarth hoy teṇe anya pāse te pūjā karāvavī.",
      "sanskritLippy": "Vārdhakyena cha rogādyair anyā’paddhetunā tathā ।\\nPūjārtham asamarthash-chet tadā’nyaih kārayet sa tām ॥77॥",
      "audioURL1": "https://baps.box.com/shared/static/5q7a4jy421858mz9e6379aa2jsgde1f6.mp3",
      "audioURL": "https://baps.box.com/shared/static/l7yptqbs1r1q44q29y4su46qmn2gj258.mp3"
    },
    {
      "id": 68,
      "shlokas": "Shloka 78",
      "englishText": "Every satsangi in a household should keep their own separate puja. Moreover, one should acquire a puja for a child on the same day that he or she is born.",
      "gujaratiText": "Gharmā pratyek satsangīe potānī swatantra pūjā rākhavī. Vaḷī putra ke putrīno janma thāy te divasathī ja santān māṭe pūjā laī levī.",
      "sanskritLippy": "Svīyapūjā svatantrā tu sarvai rakṣhyā gṛuhe pṛuthak ।\\nJanmano divasād eva pūjā grāhyā sva-santatehe ॥78॥",
      "audioURL1": "https://baps.box.com/shared/static/lx2qlizxb6rn4htm7gnqn15tlwgb4r55.mp3",
      "audioURL": "https://baps.box.com/shared/static/10r892nmn16v796cco0dynx4lvsbq01u.mp3"
    },
    {
      "id": 69,
      "shlokas": "Shloka 79-80",
      "englishText": "All satsangis should place a beautiful mandir within their homes where they can daily offer devotion, pray and practice satsang. Within the mandir, one should devoutly and ceremonially consecrate the murtis of Akshar-Purushottam and the Gunatit gurus of the tradition.",
      "gujaratiText": "Nitya pratye bhakti, prārthanā tathā satsang māṭe sarve satsangīoe gharmā sundar mandir sthāpavu. Temā bhakti-bhāve vidhivat Akṣhar-Puruṣhottam tathā paramparāmā āvel guṇātīt guruo padharāvavā.",
      "sanskritLippy": "Bhakti-prārthana-satsanga-hetunā prati-vāsaram ।\\nSundaram mandiram sthāpyam sarvaih satsangibhir gṛuhe ॥79॥\\nPrasthāpyau vidhivat tasminn-Akṣhara-Puruṣhottamau ।\\nGuravash-cha Guṇātītā bhaktyā paramparā-gatāhā ॥80॥",
      "audioURL1": "https://baps.box.com/shared/static/5bsgq3kn44xwtbu2b9kouvrrn1be0621.mp3",
      "audioURL": "https://baps.box.com/shared/static/vx13divmixh9olkxeigmb9elwd71mwxi.mp3"
    },
    {
      "id": 70,
      "shlokas": "Shloka 81",
      "englishText": "Every morning and evening, all satsangis should perform the ārti and sing the stuti before the ghar mandir.",
      "gujaratiText": "Sarve satsangī janoe prātahkāḷe tathā sānje ghar-mandirmā pratidin ārtī karavī ne sāthe stutinu gān karavu.",
      "sanskritLippy": "Prātah prati-dinam sāyam sarvaih satsangibhir janaihi ।\\nĀrārtikyam vidhātavyam sa-stuti gṛuha-mandire ॥81॥",
      "audioURL1": "https://baps.box.com/shared/static/qtvaep4xphgc7lxfcoce578iliq2ese4.mp3",
      "audioURL": "https://baps.box.com/shared/static/1ggchogooeitn83ljbwnr3ecl6axwtib.mp3"
    },
    {
      "id": 71,
      "shlokas": "Shloka 82",
      "englishText": "While performing the ārti, one should devoutly sing aloud the ārti ‘Jay Swaminarayan, Jay Akshar-Purushottam...’ with a steady mind and while clapping.",
      "gujaratiText": "Ārtī samaye chittane sthir karī bhaktie sahit, tālī vagāḍatā ane uchcha sware ‘Jay Swāminārāyaṇ jay Akṣhar-Puruṣhottam...’ em ārtīnu gān karavu.",
      "sanskritLippy": "Uchchaih swarair Jaya Swāmi-nārāyaṇeti bhaktitaha ।\\nSa-tāli-vādanam geyam sthireṇa chetasā tadā ॥82॥",
      "audioURL1": "https://baps.box.com/shared/static/g171n50bxe5w4cecnawrwlyzj7nlbdik.mp3",
      "audioURL": "https://baps.box.com/shared/static/u7yol1r1691pwm3k5mtk2zpq1beteydz.mp3"
    },
    {
      "id": 72,
      "shlokas": "Shloka 83",
      "englishText": "Offer whatever food has been prepared [to the murtis] in the ghar mandir and after devoutly reciting prayers, eat the sanctified meal.",
      "gujaratiText": "Je rasoī banāvī hoy te mandirmā dharāvavī ane prasādībhūt thayel bhojan bhakti-bhāv-pūrvak prārthanā bolīne pachhī jamavu.",
      "sanskritLippy": "Yaiva rasavatī pakvā mandire tām nivedayet ।\\nUchchārya prārthanam bhaktyā tatah prasāditam jamet ॥83॥",
      "audioURL1": "https://baps.box.com/shared/static/jbp26prhunep1xq6924ifyinpa1y5yu9.mp3",
      "audioURL": "https://baps.box.com/shared/static/n1pix5srzxz8osbqv80hx6iaeyc3crck.mp3"
    },
    {
      "id": 73,
      "shlokas": "Shloka 84",
      "englishText": "One should not consume foods, fruits, water and other items without first offering them to Bhagwan. Foods and other items that may be impure should not be offered to Bhagwan nor should they be eaten.",
      "gujaratiText": "Bhagwānne arpaṇ karyā vagar anna, faḷ ke jalādi grahaṇ na karavu. Jenī shuddhine viṣhe shankā hoy tevā annādi Bhagwānne na dharāvavā ane na jamavā.",
      "sanskritLippy": "Haraye’narpya na grāhyam anna-fala-jalādikam ।\\nShuddhau shankitam annādi nā’dyānneshe nivedayet ॥84॥",
      "audioURL1": "https://baps.box.com/shared/static/xbtd9n3l8h0kmzgfeuabwhguiws2l1rl.mp3",
      "audioURL": "https://baps.box.com/shared/static/tqcjyji18vb1gd43eftluzp732gpkhnx.mp3"
    },
    {
      "id": 74,
      "shlokas": "Shloka 85",
      "englishText": "While sitting in front of the ghar mandir, one should, with devout feelings and concentration, sing kirtans, chant and engage in smruti or other acts of devotion according to one’s preferences.",
      "gujaratiText": "Ghar-mandirmā besīne bhāve karīne sthir chitte kīrtan, jap ke smṛuti vagere potānī ruchi anusār karavu.",
      "sanskritLippy": "Kīrtanam vā japam kuryāt smṛutyādi vā yathā-ruchi ।\\nGṛuha-mandiram āsthāya bhāvatah sthira-chetasā ॥85॥",
      "audioURL1": "https://baps.box.com/shared/static/ke4d3pesiq9yurze13r7neqled4vwxyr.mp3",
      "audioURL": "https://baps.box.com/shared/static/mu39t9amj8zwx7g72h3ve1fi7bwczfz2.mp3"
    },
    {
      "id": 75,
      "shlokas": "Shloka 86",
      "englishText": "Family members should gather daily for ghar sabhā and engage in bhajan, discussions, scriptural reading and other devotional activities.",
      "gujaratiText": "ઘરના સભ્યોએ ભેગા થઈ રોજ ઘરસભા કરવી અને તેમાં ભજન, ગોષ્ઠિ તથા શાસ્ત્રોનું વાંચન ઇત્યાદિ કરવું.",
      "sanskritLippy": "Sambhūya pratyaham kāryā gṛuha-sabhā gṛuhasthitaihi ।\\nKartavyam bhajanam goṣhṭhih shāstra-pāṭhādi tatra cha ॥86॥",
      "audioURL1": "https://baps.box.com/shared/static/ttejoeihg4vl6rghd1pkeqj7nic2jov3.mp3",
      "audioURL": "https://baps.box.com/shared/static/y67a9r0a8ywblc8mrut9i1egbilu5obu.mp3"
    },
    {
      "id": 76,
      "shlokas": "Shloka 87-88",
      "englishText": "Shri Hari inspired the creation of mandirs as a form of devotion to foster and protect pure upāsanā and bhakti. He instructed that, along with Bhagwan, one should also serve his supreme devotee, Aksharbrahman, in the very same manner that one serves Bhagwan.",
      "gujaratiText": "Shrīharie shuddha upāsanā-bhaktinā poṣhaṇ ane rakṣhaṇ māṭe mandir nirmāṇrūp bhaktinu pravartan karyu. Ane Bhagwānnī jem ja temanā uttam bhakta evā Akṣharbrahmanī Bhagwānnī sāthe sevā karavā māṭe āgnā karī.",
      "sanskritLippy": "Shuddhopāsana-bhaktim hi poṣhayitum cha rakṣhitum ।\\nBhaktim mandira-nirmāṇa-rūpām prāvartayaddharihi ॥87॥\\nTathaivā’gnāpayām āsa sevārtham Hariṇā saha ।\\nTasya chottama-bhaktasya tasyevaivā’kṣharasya cha ॥88॥",
      "audioURL1": "https://baps.box.com/shared/static/xw22nl4yhlmbmbanally0yfg5uwrnsjj.mp3",
      "audioURL": "https://baps.box.com/shared/static/lnp9e7ckd37fwku2o5lj5vydpghipdie.mp3"
    },
    {
      "id": 77,
      "shlokas": "Shloka 89",
      "englishText": "Aksharbrahman is Bhagwan’s supreme devotee because he eternally transcends māyā and is forever engrossed in Bhagwan’s service.",
      "gujaratiText": "Akṣharbrahma Bhagwānnā uttam bhakta chhe, kāraṇ ke teo nitya māyāpar chhe ane nitya Bhagwānnī sevāmā ramamāṇ hoy chhe.",
      "sanskritLippy": "Vartata uttamo bhakto Brahma Bhagavato’kṣharam ।\\nNityam māyā-param nityam Hari-sevāratam yataha ॥89॥",
      "audioURL1": "https://baps.box.com/shared/static/ym5n7kc0ykf8l0hxg57zefd6la66ro4i.mp3",
      "audioURL": "https://baps.box.com/shared/static/yb7d9qm1atceybdbz9s8zdic6123ve87.mp3"
    },
    {
      "id": 78,
      "shlokas": "Shloka 90-91",
      "englishText": "To fulfil this ordinance and to grant moksha all, divine mandirs are devoutly constructed and the murti of Aksharbrahman is also ceremoniously consecrated with Purushottam Bhagwan in the central shrines [of these mandirs].",
      "gujaratiText": "Te āgnāne anusarīne sarvanu kalyāṇ thāy te hetuthī divya mandironu nirmāṇ bhakti-bhāvthī karavāmā āve chhe ane tenā madhya-khanḍmā Puruṣhottam Bhagwānnī mūrtinī sāthe Akṣharbrahmanī mūrti paṇ vidhivat sthāpavāmā āve chhe.",
      "sanskritLippy": "Mandirāṇām hi nirmāṇam tad-āgnām-anusṛutya cha ।\\nDivyānām kriyate bhaktyā sarva-kalyāṇa-hetunā ॥90॥\\nPuruṣhottama-mūrtyā tad-madhya-khaṇḍe yathā-vidhi ।\\nSahitam sthāpyate mūrtir-Akṣharasyā’pi Brahmaṇaha ॥91॥",
      "audioURL1": "https://baps.box.com/shared/static/hn9vqov7w8qejaqf1ow38tltjigerkmd.mp3",
      "audioURL": "https://baps.box.com/shared/static/suq5w5rtny2jwb9j5rw5pg991bu044w7.mp3"
    },
    {
      "id": 79,
      "shlokas": "Shloka 92",
      "englishText": "Similarly, Aksharbrahman and Purushottam Bhagwan are also always consecrated in the central shrines of mandirs in homes and other places.",
      "gujaratiText": "E ja rīte ghar ādi sthaḷone viṣhe karel mandiromā paṇ madhyamā hammeshā Akṣharbrahma sahit Puruṣhottam Bhagwānne prasthāpit karavāmā āve chhe.",
      "sanskritLippy": "Evam eva gṛuhādyeṣhu kṛuteṣhu mandireṣhvapi ।\\nMadhye prasthāpyate nityam sā’kṣharah Puruṣhottamaha ॥92॥",
      "audioURL1": "https://baps.box.com/shared/static/5ox0zlqk6zi1d9lryz12ndu8tuxd4ylz.mp3",
      "audioURL": "https://baps.box.com/shared/static/o9iih6r99hlqkso6kisakovnso5clihr.mp3"
    },
    {
      "id": 80,
      "shlokas": "Shloka 93",
      "englishText": "Daily, in the morning, evening or at another convenient time, all satsangis should devoutly go to a nearby mandir for darshan.",
      "gujaratiText": "Sarve satsangīoe savāre, sānje athavā potānā anukūḷ samaye pratidin bhaktie karīne samīpe āvel mandire darshane javu.",
      "sanskritLippy": "Prātah sāyam yathā-kālam sarva-satsangibhir janaihi ।\\nNikaṭam mandiram gamyam bhaktyā darshāya pratyaham ॥93॥",
      "audioURL1": "https://baps.box.com/shared/static/hf0x8n756lwlifizqh9dshhjo28w9x1i.mp3",
      "audioURL": "https://baps.box.com/shared/static/qvoo1hu8677ninrlk2puz7bh73fbsm4p.mp3"
    },
    {
      "id": 81,
      "shlokas": "Shloka 94",
      "englishText": "All satsangi men and women should always dress in a manner that safeguards their dharma.",
      "gujaratiText": "Sarve satsangī nar-nārīoe sadāy je rīte potānā dharmanī rakṣhā thāya te ja rīte vastro dhāravā.",
      "sanskritLippy": "Yathā sva-dharma-rakṣhā syāt tathaiva vastra-dhāraṇam ।\\nSatsangi-nara-nārībhih karaṇīyam hi sarvadā ॥94॥",
      "audioURL1": "https://baps.box.com/shared/static/heui8p864uouby8c42nv3ms0xucizoh9.mp3",
      "audioURL": "https://baps.box.com/shared/static/6qcn74exi31xadxbeg4ez5pxqbt68ivf.mp3"
    },
    {
      "id": 82,
      "shlokas": "Shloka 95",
      "englishText": "To strengthen one’s satsang, one should attend the weekly assemblies held at a nearby mandir or centre.",
      "gujaratiText": "Satsangnī dṛuḍhatā māṭe dar aṭhavāḍiye samīp āvel mandirmā ke manḍaḷmā sabhā bharavā javu.",
      "sanskritLippy": "Satsanga-dṛaḍhatārtham hi sabhārtham antike sthitam ।\\nGantavyam prati-saptāham mandiram vā’pi maṇḍalam ॥95॥",
      "audioURL1": "https://baps.box.com/shared/static/r3yrxwa855hudj8jewpucxc70lcm9wrg.mp3",
      "audioURL": "https://baps.box.com/shared/static/wen1a2vdyzfxw1sm1oiw6f6zp66yx7fj.mp3"
    },
    {
      "id": 83,
      "shlokas": "Shloka 96",
      "englishText": "Swaminarayan Bhagwan, the sovereign of Akshar, is the manifest form of Paramatma Parabrahman Purushottam Hari.",
      "gujaratiText": "Akṣharādhipati Swāminārāyaṇ Bhagwān sākṣhāt Paramātmā Parabrahma Puruṣhottam Hari chhe.",
      "sanskritLippy": "Swāminārāyaṇah sākṣhād-Akṣharādhipatir-Harihi ।\\nParamātmā Parabrahma Bhagavān Puruṣhottamaha ॥96॥",
      "audioURL1": "https://baps.box.com/shared/static/8y545nyuknoh9qkgfdwy52ap0cqyfbsg.mp3",
      "audioURL": "https://baps.box.com/shared/static/4nuxysir1u7u6kdehzgupu0tei2pt6w1.mp3"
    },
    {
      "id": 84,
      "shlokas": "Shloka 97",
      "englishText": "He alone is forever our ishtadev worthy of supreme upāsanā. One should always offer singular devotion to him only.",
      "gujaratiText": "E ek ja āpaṇā sadā param upāsya iṣhṭadev chhe. Temanī ja ananya bhāve sadā bhakti karavī.",
      "sanskritLippy": "Sa ekah paramopāsya iṣhṭa-devo hi nah sadā ।\\nTasyaiva sarvadā bhaktih kartavyā’nanya-bhāvataha ॥97॥",
      "audioURL1": "https://baps.box.com/shared/static/9frc2jbxqnzn0y2v5rf9h9anbetcj9fi.mp3",
      "audioURL": "https://baps.box.com/shared/static/na9lbf96ezfqfbehei33e10v571fire9.mp3"
    },
    {
      "id": 85,
      "shlokas": "Shloka 98",
      "englishText": "Gunatitanand Swami is the manifest form of the eternal Aksharbrahman. This Aksharbrahman paramparā is manifest even today.",
      "gujaratiText": "Guṇātītānand Swāmī sākṣhāt sanātan Akṣharbrahma chhe. E Akṣharbrahmanī paramparā āje paṇ virājamān chhe.",
      "sanskritLippy": "Sākṣhād Brahmā’kṣharam Swāmī Guṇātītah sanātanam ।\\nTasya paramparā’dyā’pi Brahmā’kṣharasya rājate ॥98॥",
      "audioURL1": "https://baps.box.com/shared/static/88ft503rg7q5cdie9kux39ilsidsjzor.mp3",
      "audioURL": "https://baps.box.com/shared/static/zmbp76kq4kwo4ed3ykkqdyexqbgu4iai.mp3"
    },
    {
      "id": 86,
      "shlokas": "Shloka 99",
      "englishText": "In the Sampraday’s tradition of gurus that began with Gunatitanand Swami, only the present form of Aksharbrahman is our guru.",
      "gujaratiText": "Sampradāymā Guṇātītānand Swāmīthī ārambhāyel guru-paramparāmā āvel pragaṭ Akṣharbrahma e ek ja āpaṇā guru chhe.",
      "sanskritLippy": "Guṇātīta-samārabdha-paramparā-pratiṣhṭhitaha ।\\nPrakaṭā’kṣhara-brahmaikah sampradāye’sti no guruhu ॥99॥",
      "audioURL1": "https://baps.box.com/shared/static/b2qx80zd1og6ebxfdmbpbsvg03xr0uyt.mp3",
      "audioURL": "https://baps.box.com/shared/static/5py08953fq8jacwjwvdila1xtohproj9.mp3"
    },
    {
      "id": 87,
      "shlokas": "Shloka 100",
      "englishText": "Our ishtadev is the same, our guru is the same and our siddhānt is also the same – thus, we are always united.",
      "gujaratiText": "Āpaṇā iṣhṭadev ek ja chhe, guru ek ja chhe ane siddhānt paṇ ek ja chhe em āpaṇī sadā ekatā chhe.",
      "sanskritLippy": "Eka eveṣhṭa-devo nah eka eva gurus-tathā ।\\nEkash-chaivā’pi siddhānta evam nah ekatā sadā ॥100॥",
      "audioURL1": "https://baps.box.com/shared/static/pz1eu6hm5l0d27hb16b2vy3ydanm2g0g.mp3",
      "audioURL": "https://baps.box.com/shared/static/htv1fvy4hw2k8xhzmq2ygvdcxkgwdmif.mp3"
    },
    {
      "id": 88,
      "shlokas": "Shloka 101",
      "englishText": "One should know [and realize] the divine Akshar-Purushottam siddhānt, which is Vedic, eternal and the form of brahmavidyā.",
      "gujaratiText": "Brahma-vidyārūp, Vaidik ane sanātan evā divya Akṣhar-Puruṣhottam siddhāntne jāṇavo.",
      "sanskritLippy": "Siddhāntam suvijānīyād Akṣhara-Puruṣhottamam ।\\nBrahmavidyātmakam divyam vaidikam cha sanātanam ॥101॥",
      "audioURL1": "https://baps.box.com/shared/static/vhgpv38b8q772jgz3woe7qkdjf1x72ju.mp3",
      "audioURL": "https://baps.box.com/shared/static/grup9o858j9ql5m6nxavg1vn3sriwfoz.mp3"
    },
    {
      "id": 89,
      "shlokas": "Shloka 102-103",
      "englishText": "Mumukshus should realize that the five entities – jiva, ishwar, māyā, Aksharbrahman and Parabrahman – are forever distinct, eternal, and true. Swaminarayan Bhagwan himself established this clear siddhānt.",
      "gujaratiText": "Jīv, īshwar, māyā, Akṣharbrahma tathā Parabrahma e pānch tattvo sadāy bhinna chhe, nitya chhe, satya chhe em mumukṣhuoe jāṇavu - em swayam Swāminārāyaṇ Bhagwāne spaṣhṭa siddhānt karyo chhe.",
      "sanskritLippy": "Jīvas-tatheshvarash-chaiva māyā brahmā’kṣharam tathā ।\\nParabrahmeti tattvāni bhinnāni pancha sarvadā ॥102॥\\nNityān yatha cha satyāni vigneyāni mumukṣhubhihi ।\\nSvāminārāyaṇenaivam siddhāntitam svayam sfuṭam ॥103॥",
      "audioURL1": "https://baps.box.com/shared/static/ewgtbpawvhbzsycj0m4w73cyrt6saukh.mp3",
      "audioURL": "https://baps.box.com/shared/static/g0o7x3mc40ffb4man0xf6mtbmuoqgy7f.mp3"
    },
    {
      "id": 90,
      "shlokas": "Shloka 104",
      "englishText": "Among these entities, Akshar and Purushottam are the two who are eternally beyond māyā. Jivas and ishwars attain moksha by associating with them.",
      "gujaratiText": "Temā Akṣhar ane Puruṣhottam e be sadāy māyāthī par chhe ane jīvo tathā īshwaronī mukti temanā yogthī thāy chhe.",
      "sanskritLippy": "Teṣhu māyā-parau nityam Akṣhara-Puruṣhottamau ।\\nJīvānām-īshvarāṇām cha muktis-tad-yogato bhavet ॥104॥",
      "audioURL1": "https://baps.box.com/shared/static/exrxjuei53purroc7v91tnwwsza1095m.mp3",
      "audioURL": "https://baps.box.com/shared/static/io0hcub7b8jump2ltiz0ax74vkmbas5p.mp3"
    },
    {
      "id": 91,
      "shlokas": "Shloka 105",
      "englishText": "Paramatma Parabrahman is forever superior to Aksharbrahman. Furthermore, even Aksharbrahman eternally serves Paramatma with dāsbhāv.",
      "gujaratiText": "Paramātmā Parabrahma sadā Akṣharbrahmathī par chhe ane Akṣharbrahma paṇ te Paramātmānī nitya dāsbhāve sevā kare chhe.",
      "sanskritLippy": "Paramātmā Parabrahma param Brahmā’kṣharāt sadā ।\\nBrahmā’pi sevate tam cha dāsa-bhāvena sarvadā ॥105॥",
      "audioURL1": "https://baps.box.com/shared/static/4d6bwwr77a73epg3vvkxssq1dn3j7tlw.mp3",
      "audioURL": "https://baps.box.com/shared/static/2q146lr1lv9csx2v6618p1fsfm96wtbg.mp3"
    },
    {
      "id": 92,
      "shlokas": "Shloka 106",
      "englishText": "Bhagwan is eternally the all-doer, with form and supreme; he always remains manifest for the moksha of mumukshus.",
      "gujaratiText": "Bhagwān sadāy sarva-kartā, sākār, sarvoparī chhe ane mumukṣhuonī mukti māṭe hammeshā pragaṭ rahe chhe.",
      "sanskritLippy": "Sarva-kartā cha sākārah sarvopari sadā Harihi ।\\nMumukṣhūṇām vimokṣhāya prakaṭo vartate sadā ॥106॥",
      "audioURL1": "https://baps.box.com/shared/static/upzp0sbeim4a09d5ourivjljtj5uoqoy.mp3",
      "audioURL": "https://baps.box.com/shared/static/4ehvprs1tmg9mei4zbdic83auubrnw9k.mp3"
    },
    {
      "id": 93,
      "shlokas": "Shloka 107",
      "englishText": "Through the Aksharbrahman guru, Bhagwan always remains present with all of his divinity and bestows utmost bliss.",
      "gujaratiText": "Akṣharbrahma-swarūp guru dvārā Bhagwān potānā sakaḷ aishvaryo sahit, paramānand arpatā thakā sadāy pragaṭ rahe chhe.",
      "sanskritLippy": "Brahmā’kṣhara-guru-dvārā Bhagavān prakaṭah sadā ।\\nSahitah sakalaishvaryaih paramā’nandam arpayan ॥107॥",
      "audioURL1": "https://baps.box.com/shared/static/woh4fn3jasrmbv9zkf8jic2n7r1pykcb.mp3",
      "audioURL": "https://baps.box.com/shared/static/0jgwx40u4qykty5wyvjzap8eexkhjgk3.mp3"
    },
    {
      "id": 94,
      "shlokas": "Shloka 108",
      "englishText": "One should foster intense love and ātmabuddhi for the Aksharbrahman guru. Believing the guru as the manifest form of Bhagwan, one should serve him and meditate on him with devotion.",
      "gujaratiText": "Akṣharbrahma gurune viṣhe dṛuḍh prīti ane ātmabuddhi karavī. Temane viṣhe pratyakṣh Bhagwānno bhāv lāvīne bhaktie karīne temanī sevā tathā dhyān karavā.",
      "sanskritLippy": "Prītih kāryā’tma-buddhish-cha Brahmā’kṣhare gurau dṛaḍhā ।\\nPratyakṣha-Bhagavad-bhāvāt sevyo dhyeyah sa bhaktitaha ॥108॥",
      "audioURL1": "https://baps.box.com/shared/static/2rputa2pw5xc98uicfc0g95l40g7t1a4.mp3",
      "audioURL": "https://baps.box.com/shared/static/x0y1u7q5tuq7qpfxqkc83p5wc09ia7f4.mp3"
    },
    {
      "id": 95,
      "shlokas": "Shloka 109-110",
      "englishText": "The ‘Swaminarayan’ mantra is divine, beyond this world and auspicious. Shri Hari himself bestowed this mantra. All devotees should chant it. In this mantra, understand that ‘Swami’ refers to Aksharbrahman, and ‘Narayan’ refers to Purushottam, who is superior to Aksharbrahman.",
      "gujaratiText": "Swāminārāyaṇ mantra divya, alaukik ane shubh mantra chhe. Swayam Shrīharie ā mantra āpyo chhe. Sarva bhaktoe teno jap karavo. Ā mantramā ‘Swāmi’ shabdathī Akṣharbrahmane samajavā ane ‘Nārāyaṇ’ shabdathī te Akṣharbrahmathī par evā Puruṣhottamne samajavā.",
      "sanskritLippy": "Swāminārāyaṇo mantro divyash-chā’laukikah shubhaha ।\\nJapyo’yam sakalair bhaktair datto’yam Hariṇā swayam ॥109॥\\nAkṣhara Brahma vigneyam mantre Swāmīti shabdataha ।\\nNārāyaṇeti shabdena tat-parah Puruṣhottamaha ॥110॥",
      "audioURL1": "https://baps.box.com/shared/static/ms1ie4z1lkn2h5y5e6trt0c8tbcusad0.mp3",
      "audioURL": "https://baps.box.com/shared/static/qxlmrwbkproik9ohfbascil6lkx5y0qd.mp3"
    },
    {
      "id": 96,
      "shlokas": "Shloka 111-114",
      "englishText": "Ā Bhagwan Swaminarayan revealed this siddhānt in this world. The Gunatit gurus spread it throughout the world. Shastriji Maharaj enshrined it in the form of murtis. It was reaffirmed in the jivancharitra texts of the gurus. This siddhānt was securely established by guruhari Pramukh Swami Maharaj in his own handwriting. This siddhānt may be imbibed in one’s life through the association of the manifest guruhari. It is this eternal and moksha-bestowing siddhānt that is known as the divine ‘Akshar- Purushottam Darshan’.",
      "gujaratiText": "Ā siddhānt Bhagwān Swāminārāyaṇe ā lokmā prabodhyo. Guṇātīt guruoe tenu digantmā pravartan karyu. Shāstrījī Mahārāje tene mūrtimān karyo. Guruonā jīvan-charitra-granthomā tenī punah dṛuḍhatā karāvavāmā āvī. Ā siddhāntne guruhari Pramukh Swāmī Mahārāje potānā hastākṣharthī lakhī sthir karyo. Sākṣhāt guruharinā prasangthī ā siddhānt jīvanmā prāpt karī shakāy chhe. Te ā satya sanātan muktiprad siddhāntne ja divya ‘Akṣhar-Puruṣhottam Darshan’ kahevāmā āve chhe.",
      "sanskritLippy": "Swāminārāyaṇeneha siddhānto’yam prabodhitaha ।\\nGurubhish-cha Guṇātītair digante’yam pravartitaha ॥111॥\\nYagnapuruṣhadāsena sthāpito mūrti-mattayā ।\\nGuru-charitra-grantheṣhu punar ayam dṛaḍhāyitaha ॥112॥\\nPramukha-guruṇā yo’yam svīyā’kṣharaih sthirī-kṛutaha ।\\nSākṣhād guroh prasangena labhyate’yam hi jīvane ॥113॥\\nAyam eva sa siddhānto mukti-pradah sanātanaha ।\\nUchyate darshanam divyam Akṣhara-Puruṣhottamam ॥114॥",
      "audioURL1": "https://baps.box.com/shared/static/gymfb84yxi2cz5v3f6ob5d95i6r1aw6t.mp3",
      "audioURL": "https://baps.box.com/shared/static/xljewafe69gumykw03ixrxzpp38u4mud.mp3"
    },
    {
      "id": 97,
      "shlokas": "Shloka 115",
      "englishText": "While reflecting on such a supremely divine siddhānt, one should engage in satsang with conviction, joy and enthusiasm.",
      "gujaratiText": "Āvā param divya siddhāntnu chintavan karatā karatā niṣhṭhāthī ane ānand-utsāh-pūrvak satsang karavo.",
      "sanskritLippy": "Siddhāntam paramam divyam etādṛusham vichintayan ।\\nSatsangam niṣhṭhayā kuryād ānandotsāha-pūrvakam ॥115॥",
      "audioURL1": "https://baps.box.com/shared/static/87fjruvgzy9i31r03phnum0mu1qvwzaj.mp3",
      "audioURL": "https://baps.box.com/shared/static/9lhwgzqjkhwjt51xijgpxo9ojrbxy8sm.mp3"
    },
    {
      "id": 98,
      "shlokas": "Shloka 116",
      "englishText": "Identify one’s ātmā, which is distinct from the three bodies, as brahmarup and always offer upāsanā to Parabrahman.",
      "gujaratiText": "Traṇ dehthī vilakṣhaṇ evā potānā ātmāne viṣhe brahmarūpnī vibhāvanā karī sadaiv Parabrahmanī upāsanā karavī.",
      "sanskritLippy": "Nijā’tmānam brahmarūpam deha-traya-vilakṣhaṇam ।\\nVibhāvyopāsanam kāryam sadaiva Parabrahmaṇaha ॥116॥",
      "audioURL1": "https://baps.box.com/shared/static/cyr6uu5ye9lp4va9yf7616ts25rfknd3.mp3",
      "audioURL": "https://baps.box.com/shared/static/4pmae6k8cu7qrx3vblfgla4futil279x.mp3"
    },
    {
      "id": 99,
      "shlokas": "Shloka 117",
      "englishText": "One should offer devotion to Paramatma, the sovereign of Akshar, while always upholding dharma. One should never perform bhakti without dharma.",
      "gujaratiText": "Akṣharādhipati Paramātmānī bhakti sadā dharme sahit karavī. Kyārey dharme rahit bhakti na karavī.",
      "sanskritLippy": "Akṣharādhipater bhaktim sa-dharmām ācharet sadā ।\\nDharmeṇa rahitām naiva bhaktim kuryāt kadāchana ॥117॥",
      "audioURL1": "https://baps.box.com/shared/static/acejdyvq1sn3yc0u7yito9oaec6p8wfp.mp3",
      "audioURL": "https://baps.box.com/shared/static/92gw8ac2ost6fotpphqk1bsv5hqjdll9.mp3"
    },
    {
      "id": 100,
      "shlokas": "Shloka 118",
      "englishText": "One should not behave immorally even under the pretext of devotion, wisdom or festivals.",
      "gujaratiText": "Bhaktinu ke gnānnu ālamban laīne ke koī parvanu ālamban laīne paṇ manuṣhyae adharmanu ācharaṇ na karavu.",
      "sanskritLippy": "Bhaktim vā gnānam ālambya naivā’dharmam charej-janaha ।\\nApi parva-visheṣham vā’ lambya nā’dharmam ācharet ॥118॥",
      "audioURL1": "https://baps.box.com/shared/static/xkpry580pt8kfyfloi9iyunr139r8wqu.mp3",
      "audioURL": "https://baps.box.com/shared/static/tvegdk3g5xibuzxmlmeccyihes6mmk30.mp3"
    },
    {
      "id": 101,
      "shlokas": "Shloka 119",
      "englishText": "Even during festivities, one should abstain from bhang, alcohol and other such substances, as well as gambling, swearing and other such activities.",
      "gujaratiText": "Parvane viṣhe paṇ bhāng, dārū vagerenu pān karavu, jugār vagere ramavu, gāḷo bolavī ityādi na karavu.",
      "sanskritLippy": "Bhangā-surādi-pānam vā dyūtādi-krīḍanam tathā ।\\nGāli-dānādikam naiva parvasvapi samācharet ॥119॥",
      "audioURL1": "https://baps.box.com/shared/static/4hxrfqylr33c0q87xigrujbuo5tgqo44.mp3",
      "audioURL": "https://baps.box.com/shared/static/zaxg3ehd38vqsl9l41rxth2sgmop9lt7.mp3"
    },
    {
      "id": 102,
      "shlokas": "Shloka 120",
      "englishText": "Vairāgya is to not have love for anything or anyone other than Parabrahman and Aksharbrahman. It serves to support bhakti.",
      "gujaratiText": "Parabrahma tathā Akṣharbrahma sivāya anyatra prīti na hovī te vairāgya chhe. Te bhaktinu sahāyak ang chhe.",
      "sanskritLippy": "Parasmād Brahmaṇo’nyasmin-nakṣharād Brahmaṇas-tathā ।\\nPrītyabhāvo hi vairāgyam angam bhakteh sahāyakam ॥120॥",
      "audioURL1": "https://baps.box.com/shared/static/45ei5um90hkwduiqdo7bvfc4bs5brwtp.mp3",
      "audioURL": "https://baps.box.com/shared/static/lwyx63k6tjjk2guy5eunefuomxcobpyq.mp3"
    },
    {
      "id": 103,
      "shlokas": "Shloka 121",
      "englishText": "When faced with criticism, shame, fear or difficulty, one should never abandon satsang, Swaminarayan Bhagwan, devotion towards him, or the guru.",
      "gujaratiText": "Nindā, lajjā, bhay ke mushkelīone līdhe kyārey satsang, Swāminārāyaṇ Bhagwān, temanī bhakti ane guruno tyāg na karavo.",
      "sanskritLippy": "Nindā-lajjā-bhayā’padbhyah satsangam na pari-tyajet ।\\nSwāminārāyaṇam Devam tad-bhaktim karhichid gurum ॥121॥",
      "audioURL1": "https://baps.box.com/shared/static/8tnzl8zwe84tgrgxladdofi2onqrljcm.mp3",
      "audioURL": "https://baps.box.com/shared/static/m9sar6p0ky14f79tkdrkaimyk43a4dvn.mp3"
    },
    {
      "id": 104,
      "shlokas": "Shloka 122",
      "englishText": "One should serve Bhagwan and his devotees with pure intentions, believing it to be one’s great fortune and with the goal of attaining one’s moksha.",
      "gujaratiText": "Bhagwān ane bhaktonī sevā shuddhabhāve, mārā moṭā bhāgya chhe em mānīne potānā mokṣha māṭe karavī.",
      "sanskritLippy": "Sevā Haresh-cha bhaktānām kartavyā shuddha-bhāvataha ।\\nMahad-bhāgyam mamāstīti matvā sva-mokṣha-hetunā ॥122॥",
      "audioURL1": "https://baps.box.com/shared/static/fn14ut9afdtwrucat720449bgpy2mrcm.mp3",
      "audioURL": "https://baps.box.com/shared/static/5ch2lxut36m3g8flqywfyofof5842ogv.mp3"
    },
    {
      "id": 105,
      "shlokas": "Shloka 123",
      "englishText": "One should not let time pass wastefully without satsang or devotion. One should always give up laziness and negligence.",
      "gujaratiText": "Satsang ane bhajan vinā vyartha kāḷ nirgamavo nahī. Āḷas tathā pramād vagereno hammeshā parityāg karavo.",
      "sanskritLippy": "Neyo na vyarthatām kālah satsangam bhajanam vinā ।\\nĀlasyam cha pramādādi pari-tyājyam hi sarvadā ॥123॥",
      "audioURL1": "https://baps.box.com/shared/static/emkalotgdfl7qo6y1u3v0f4zv8s45miz.mp3",
      "audioURL": "https://baps.box.com/shared/static/exj1romf8bu7xg51trgljxpbsnx5yvk9.mp3"
    },
    {
      "id": 106,
      "shlokas": "Shloka 124",
      "englishText": "One should perform tasks while engaging in devotion and according to āgnā. By doing so, one will not become attached to one’s actions, be burdened by them or develop ego because of them.",
      "gujaratiText": "Bhajan karatā karatā kriyā karavī. Āgnā anusāre karavī. Ām karavāthī kriyānu bandhan na thāy, kriyāno bhār na lāge ane kriyānu mān na āve.",
      "sanskritLippy": "Kuryāddhi bhajanam kurvan kriyā āgnā’nusārataha ।\\nKriyā-bandhah kriyā-bhārah kriyāmānas-tato na hi ॥124॥",
      "audioURL1": "https://baps.box.com/shared/static/dn8btax5e3zzlojlk3cgriavf5g9e4mi.mp3",
      "audioURL": "https://baps.box.com/shared/static/e8drf4a98k6pi0w0clivbke87cbwjw9h.mp3"
    },
    {
      "id": 107,
      "shlokas": "Shloka 125",
      "englishText": "One should fruitfully use time by performing sevā, listening to discourses, smruti, meditating, studying, singing kirtans of Bhagwan and engaging in other such activities.",
      "gujaratiText": "Sevā, kathā, smaraṇ, dhyān, paṭhanādi tathā bhagwat-kīrtan vagerethī samayne sufaḷ karavo.",
      "sanskritLippy": "Sevayā kathayā smṛutyā dhyānena paṭhanādibhihi ।\\nSufalam samayam kuryād Bhagavat-kīrtanādibhihi ॥125॥",
      "audioURL1": "https://baps.box.com/shared/static/845l5jzoo694gi3us47mpld9hxl96ljv.mp3",
      "audioURL": "https://baps.box.com/shared/static/1lv00p08vjmzqmsbhe2ii11xdun2vrys.mp3"
    },
    {
      "id": 108,
      "shlokas": "Shloka 126",
      "englishText": "One should take the refuge of satsang to rid oneself of flaws, acquire virtues and attain ultimate moksha.",
      "gujaratiText": "Satsangno āsharo potānā durguṇone ṭāḷavā, sadguṇone prāpt karavā ane potānā param kalyāṇ māṭe karavo.",
      "sanskritLippy": "Sva-dur-guṇān apā-kartum sam-prāptum sad-guṇāns-tathā ।\\nSatsangā’shrayaṇam kāryam svasya parama-muktaye ॥126॥",
      "audioURL1": "https://baps.box.com/shared/static/9sstzioyzydx379sp9h26af2c1979awb.mp3",
      "audioURL": "https://baps.box.com/shared/static/tfnxzzm83r7ae2brthas34ruv98prtgv.mp3"
    },
    {
      "id": 109,
      "shlokas": "Shloka 127",
      "englishText": "One should forever take the refuge of satsang to attain the pleasure of Swaminarayan Bhagwan and the Gunatit gurus.",
      "gujaratiText": "Swāminārāyaṇ Bhagwān tathā guṇātīt guruonī prasannatā prāpt karavā sadā satsangno āsharo karavo.",
      "sanskritLippy": "Prasannatām samāvāptum Swāminārāyaṇa-Prabhoho ।\\nGuṇātīta-gurūṇām cha satsangam āshrayet sadā ॥127॥",
      "audioURL1": "https://baps.box.com/shared/static/dmjxrsermpn7d4rjzpq6jge3zo5tbfv6.mp3",
      "audioURL": "https://baps.box.com/shared/static/wbkcuqt323gca7oh28gge599yccx0onf.mp3"
    },
    {
      "id": 110,
      "shlokas": "Shloka 128",
      "englishText": "O! We have attained both Akshar and Purushottam here [in this life]. With the joy of having attained them, one should always relish the bliss of satsang.",
      "gujaratiText": "Aho! Āpaṇne Akṣhar ane Puruṣhottam banne ahī ja maḷyā chhe. Temanī prāptinā kefthī satsangnā ānandne sadāy māṇavo.",
      "sanskritLippy": "Aho ihaiva nah prāptāv-Akṣhara-Puruṣhottamau ।\\nTat-prāpti-gauravān-nityam satsang-ānandam āpnuyāt ॥128॥",
      "audioURL1": "https://baps.box.com/shared/static/nym8sbekvv131rpi9gz7lqf9169dy85f.mp3",
      "audioURL": "https://baps.box.com/shared/static/86z8yu7avf3pebgvw2wg09oyz7mxewsh.mp3"
    },
    {
      "id": 111,
      "shlokas": "Shloka 129-130",
      "englishText": "One should never perform sevā, devotion, discourses, meditation, austerities, pilgrimages and other endeavours out of vanity, pretence, jealousy, competition, enmity or for the attainment of worldly fruits. However, they should be performed with faith, pure intentions and the wish to please Bhagwan.",
      "gujaratiText": "Sevā, bhakti, kathā, dhyān, tap tathā yātrā ityādi sādhan karīe te māne karīne, dambhe karīne, īrṣhyāe karīne, spardhāe karīne, dveṣhe karīne ke pachhī laukik faḷnī ichchhāthī na ja karavu. Parantu shraddhāe sahit, shuddha-bhāvthī ane Bhagwānne rājī karavānī bhāvanāthī karavu.",
      "sanskritLippy": "Sevā-bhakti-kathā-dhyāna-tapo-yātrādi sādhanam ।\\nMānato dambhato naiva kāryam naiverṣhyayā tathā ॥129॥\\nSpardhayā dveṣhato naiva na laukika-falechchhayā ।\\nShraddhayā shuddha-bhāven kāryam prasannatā-dhiyā ॥130॥",
      "audioURL1": "https://baps.box.com/shared/static/iz5foql77s6jgu7fddxq2h11u8sczlqf.mp3",
      "audioURL": "https://baps.box.com/shared/static/cz2wewyy8tvuopwcuoc96khuvdir8dtr.mp3"
    },
    {
      "id": 112,
      "shlokas": "Shloka 131",
      "englishText": "One should not perceive human traits in Bhagwan or the guru, since both Akshar and Purushottam are beyond māyā and divine.",
      "gujaratiText": "Bhagwān tathā gurune viṣhe manuṣhyabhāv na jovo. Kāraṇ ke Aṣhar ane Puruṣhottam banne māyāthī par chhe, divya chhe.",
      "sanskritLippy": "Dṛashyo na mānuṣho bhāvo Bhagavati tathā gurau ।\\nMāyā-parau yato divyāv-Akṣhara-Puruṣhottamau ॥131॥",
      "audioURL1": "https://baps.box.com/shared/static/uozxaopgw6350ojaryswixf2xoob4ie8.mp3",
      "audioURL": "https://baps.box.com/shared/static/faini7sd8uicx0zt5fqi511k7o4yzkkp.mp3"
    },
    {
      "id": 113,
      "shlokas": "Shloka 132",
      "englishText": "One should develop firm faith in Bhagwan and the guru, renounce feebleness, have patience and derive strength from Bhagwan.",
      "gujaratiText": "Bhagwān tathā gurune viṣhe vishvās dṛuḍh karavo, nirbaḷtāno tyāg karavo, dhīraj rākhavī tathā Bhagwānnu baḷ rākhavu.",
      "sanskritLippy": "Vishvāsah su-dṛaḍhī-kāryo Bhagavati tathā gurau ।\\nNirbalatvam pari-tyājyam dhāryam dhairyam Harer balam ॥132॥",
      "audioURL1": "https://baps.box.com/shared/static/81ezlo843cfd18ekqb5vnlr3tl3zp1r4.mp3",
      "audioURL": "https://baps.box.com/shared/static/zacseesgne21gm1460rtlw0f3r1766cs.mp3"
    },
    {
      "id": 114,
      "shlokas": "Shloka 133",
      "englishText": "One should listen to, recite, read, reflect upon and repeatedly recall the incidents of Swaminarayan Bhagwan.",
      "gujaratiText": "Swāminārāyaṇ Bhagwānnā līlā-charitronu shravaṇ, kathan, vānchan, manan tathā nididhyāsan karavu.",
      "sanskritLippy": "Kāryam līlā-charitrāṇām Swāminārāyaṇa-Prabhoho ।\\nShravaṇam kathanam pāṭho mananam nidi-dhyāsanam ॥133॥",
      "audioURL1": "https://baps.box.com/shared/static/fr6j3xqw12z5qa3hq14ggetz03r3hnh1.mp3",
      "audioURL": "https://baps.box.com/shared/static/616qquc6g2srglr6ah5z9k486kjdekx4.mp3"
    },
    {
      "id": 115,
      "shlokas": "Shloka 134",
      "englishText": "Mumukshus should always associate with the manifest Aksharbrahman guru with supreme love and divyabhāv.",
      "gujaratiText": "Mumukṣhuoe pratyakṣh Akṣharbrahma guruno prasang sadā param prīti ane divyabhāvthī karavo.",
      "sanskritLippy": "Prasangah parayā prītyā Brahmā’kṣhara-guroh sadā ।\\nKartavyo divya-bhāvena pratyakṣhasya mumukṣhubhihi ॥134॥",
      "audioURL1": "https://baps.box.com/shared/static/najqmztwoh35vb66ecds2imu5kr5g4dj.mp3",
      "audioURL": "https://baps.box.com/shared/static/k3gtjvtuekf3uvfrrcgg3lk92zekn6co.mp3"
    },
    {
      "id": 116,
      "shlokas": "Shloka 135",
      "englishText": "Intense affection for the Aksharbrahman guru is the only means to attaining the brāhmic state and realizing Bhagwan.",
      "gujaratiText": "Akṣharbrahma-swarūp gurune viṣhe dṛuḍh prīti e ja brāhmī sthiti tathā Bhagwānnā sākṣhātkārne pāmavānu sādhan chhe.",
      "sanskritLippy": "Brahmā’kṣhare gurau prītir dṛaḍhaivā’sti hi sādhanam ।\\nBrahma-sthiteh pari-prāpteh sākṣhāt-kārasya cha Prabhoho ॥135॥",
      "audioURL1": "https://baps.box.com/shared/static/mq9zaesde62wtjb8395toq4r2i2ohrc1.mp3",
      "audioURL": "https://baps.box.com/shared/static/m706jpvzjfw51i8ze7l9h47ku6n50uo9.mp3"
    },
    {
      "id": 117,
      "shlokas": "Shloka 136",
      "englishText": "To imbibe the virtues of the Aksharbrahman guru and to experience Parabrahman, one should always reflect on the incidents of the Aksharbrahman guru.",
      "gujaratiText": "Akṣharbrahma gurunā guṇo ātmasāt karavā māṭe tathā Parabrahmanī anubhūti māṭe Akṣharbrahma gurunā prasangonu sadāy manan karavu.",
      "sanskritLippy": "Brahma-guṇa-samāvāptyai Parabrahmā’nubhūtaye ।\\nBrahma-guroh prasangānām kartavyam mananam sadā ॥136॥",
      "audioURL1": "https://baps.box.com/shared/static/9di3czcdlkboq2kgsd6v0s64ydm9j42s.mp3",
      "audioURL": "https://baps.box.com/shared/static/c9vg1jd71hylrssz49dzh01le3i846ws.mp3"
    },
    {
      "id": 118,
      "shlokas": "Shloka 137",
      "englishText": "One should associate with one’s guruhari through thought, word and deed and should realize him as ‘Narayanswarup’ – the manifest form of Narayan [Parabrahman].",
      "gujaratiText": "Man-karma-vachane guruharinu sadā sevan karavu ane temane viṣhe pratyakṣh Nārāyaṇswarūpnī bhāvanā karavī.",
      "sanskritLippy": "Manasā karmaṇā vāchā sevyo Guruharih sadā ।\\nKartavyā tatra pratyakṣha-Nārāyaṇa-svarūpa-dhīhi ॥137॥",
      "audioURL1": "https://baps.box.com/shared/static/frtu7yyul9f4lsy2fhgt0ikmoe28nbfe.mp3",
      "audioURL": "https://baps.box.com/shared/static/yc0z175ppxfyi7ctep9nhpuub4rkyqpu.mp3"
    },
    {
      "id": 119,
      "shlokas": "Shloka 138",
      "englishText": "A satsangi should never listen to or speak discouraging words. One should always speak encouraging words.",
      "gujaratiText": "Satsangīe kyārey baḷ-rahit vāt sāmbhaḷavī nahī ane karavī paṇ nahī. Hammeshā baḷ bharelī vāto karavī.",
      "sanskritLippy": "Shṛuṇuyān-na vaden-nā’pi vārtām hīnām balena cha ।\\nBala-pūrṇām sadā kuryād vārtām satsangam āsthitaha ॥138॥",
      "audioURL1": "https://baps.box.com/shared/static/990yegwpv7yw6kvrioesm67edhkw3ox8.mp3",
      "audioURL": "https://baps.box.com/shared/static/uxnynd7zp0x3zzoszuvpdh45ak3df0tb.mp3"
    },
    {
      "id": 120,
      "shlokas": "Shloka 139",
      "englishText": "With affection and reverence, one should continuously speak of the glory of Brahman and Parabrahman and the greatness of those who are associated with them.",
      "gujaratiText": "Preme karīne tathā ādar thakī Brahma ane Parabrahmanā mahimānī tathā temanā sambandh-vāḷānā mahimānī vāto nirantar karavī.",
      "sanskritLippy": "Vārtā kāryā mahimno hi Brahma-Parama-brahmaṇoho ।\\nTat-sambandha-vatām chā’pi sa-sneham ādarāt sadā ॥139॥",
      "audioURL1": "https://baps.box.com/shared/static/pwv5e4q8kilyvxhykphkhs5x6f42z017.mp3",
      "audioURL": "https://baps.box.com/shared/static/k6agf5otr4zp0dkz8wvzypiqkmuu1bie.mp3"
    },
    {
      "id": 121,
      "shlokas": "Shloka 140",
      "englishText": "Mumukshus should keep suhradbhāv, divyabhāv and brahmabhāv toward satsangis.",
      "gujaratiText": "Mumukṣhue satsangīone viṣhe suhṛudbhāv, divyabhāv tathā brahmabhāv rākhavā.",
      "sanskritLippy": "Satsangiṣhu suhṛud-bhāvo divya-bhāvas-tathaiva cha ।\\nAkṣharabrahma-bhāvash-cha vidhātavyo mumukṣhuṇā ॥140॥",
      "audioURL1": "https://baps.box.com/shared/static/jsjgwk3zr6sylblzhhnib3ouk4zqq4cc.mp3",
      "audioURL": "https://baps.box.com/shared/static/1m2dzg32exhip29hiu8dq2eyuy5lg4ts.mp3"
    },
    {
      "id": 122,
      "shlokas": "Shloka 141-142",
      "englishText": "With discretion, one should always keep the paksh of Paramatma Parabrahman Swaminarayan Bhagwan, the Aksharbrahman Gunatit guru, the divine siddhānt they have imparted and the devotees who have sought their refuge.",
      "gujaratiText": "Paramātmā Parabrahma Swāminārāyaṇ Bhagwān, Akṣharbrahma-swarūp guṇātīt guru, temaṇe āpel divya siddhānt tathā temanā āshrit bhaktono viveke karīne sadāy pakṣh rākhavo.",
      "sanskritLippy": "Paramātma-Parabrahma-Swāminārāyaṇa-Prabhoho ।\\nBrahmā’kṣhara-svarūpasya Guṇātīta-guros-tathā ॥141॥\\nTad-arpitasya divyasya siddhāntasya cha sarvadā ।\\nBhaktānām tach-chhritānām cha pakṣho grāhyo vivekataha ॥142॥",
      "audioURL1": "https://baps.box.com/shared/static/5p99eqrp679f1ceyw906pzcwrc6uagto.mp3",
      "audioURL": "https://baps.box.com/shared/static/jl5je6b02v6zysiptj510s42tsfmuwgl.mp3"
    },
    {
      "id": 123,
      "shlokas": "Shloka 143-144",
      "englishText": "One should always obey the commands of Bhagwan and the Brahmaswarup guru. One should realize their inner wishes and firmly abide by them. Their instructions should be followed without laziness, immediately, and always with joy, enthusiasm, mahimā and an eagerness to please them.",
      "gujaratiText": "Bhagwān ane brahmaswarūp gurunī āgnānu sadāy pālan karavu. Temanī anuvṛutti jāṇīne tene dṛuḍhapaṇe anusaravu. Temanī āgnā āḷas vagere mūkīne pāḷavī, tarat pāḷavī; sadā ānand, utsāh ane mahimā sāthe temane rājī karavānā bhāvthī pāḷavī.",
      "sanskritLippy": "Āgnām Bhagavato nityam Brahma-gurosh-cha pālayet ।\\nGnātvā tad-anuvṛuttim cha tām evā’nusared dṛaḍham ॥143॥\\nTad-āgnām pālayet sadya ālasyādi vihāya cha ।\\nSānandotsāha-māhātmyam tat-prasāda-dhiyā sadā ॥144॥",
      "audioURL1": "https://baps.box.com/shared/static/c3s8yvqca0ddy9en4j1nyocfhnkdcz1u.mp3",
      "audioURL": "https://baps.box.com/shared/static/c5cxyzqduf1ry1vtwan641xvb40bnkfe.mp3"
    },
    {
      "id": 124,
      "shlokas": "Shloka 145",
      "englishText": "With a composed mind, one should introspect every day: “What have I come to accomplish in this world and what am I doing?”",
      "gujaratiText": "Pratidin sthir chitte antardṛuṣhṭi karavī ke hu ā lokmā shu karavā āvyo chhu? Ane shu karī rahyo chhu?",
      "sanskritLippy": "Antar-dṛaṣhṭish-cha kartavyā pratyaham sthira-chetasā ।\\nKim kartum āgato’smīha kim kurve’ham iheti cha ॥145॥",
      "audioURL1": "https://baps.box.com/shared/static/wqdv61mt4891n4cvk0hmkiy85rx4rj0e.mp3",
      "audioURL": "https://baps.box.com/shared/static/fqalfoxgjxxt0l3wqlack778bhee5y40.mp3"
    },
    {
      "id": 125,
      "shlokas": "Shloka 146",
      "englishText": "“Having attained oneness with Akshar, I offer devotion to Purushottam.” In this manner, one should reflect on one’s goal each day without laziness.",
      "gujaratiText": "‘Akṣharrūp thaīne hu Puruṣhottamnī bhakti karu’ em potānā lakṣhyanu chintan āḷas rākhyā vagar roj karavu.",
      "sanskritLippy": "Samprāpyā’kṣhara-rūpatvam bhajeyam Puruṣhottamam ।\\nPratyaham chintayed evam svīya-lakṣhyam atandritaha ॥146॥",
      "audioURL1": "https://baps.box.com/shared/static/rlmm0crlowrf9jrnswy5iq6bl6ssv6wp.mp3",
      "audioURL": "https://baps.box.com/shared/static/w0wi8rv1ls56q6ozagmi411tddcnbbtl.mp3"
    },
    {
      "id": 126,
      "shlokas": "Shloka 147-148",
      "englishText": "Swaminarayan Bhagwan is the all-doer, supreme entity and controller. I have his association here in person. For this very reason, I am joyous, greatly fortunate, fulfilled, without doubts and worries, and forever blissful.",
      "gujaratiText": "Ā Swāminārāyaṇ Bhagwān sarva-kartā-hartā chhe, sarvoparī chhe, niyāmak chhe. Teo mane ahī pratyakṣh maḷyā chhe. Āthī ja hu dhanya chhu, param bhāgyashāḷī chhu, kṛutārth chhu, nihshank chhu, nishchint chhu ane sadā sukhī chhu.",
      "sanskritLippy": "Kartā’yam sarva-hartā’yam sarvopari niyāmakaha ।\\nPratyakṣham iha labdho me Swāminārāyaṇo Harihi ॥147॥\\nAt evā’smi dhanyo’ham parama-bhāgyavān aham ।\\nKṛutārthash-chaiva nihshanko nishchinto’smi sadā sukhī ॥148॥",
      "audioURL1": "https://baps.box.com/shared/static/1plr3wpte0o0oo4tpa4h6984qzrxof0h.mp3",
      "audioURL": "https://baps.box.com/shared/static/4krk4kngywpyvzfy8kobahkunff0eej2.mp3"
    },
    {
      "id": 127,
      "shlokas": "Shloka 149",
      "englishText": "In this way, with a composed mind, one should reflect daily on one’s divine attainment of Paramatma, his greatness and [attaining] his pleasure.",
      "gujaratiText": "Ā rīte Paramātmānī divya prāptinu, mahimānu tathā temanī prasannatānu chintan dar-roj sthir chitte karavu.",
      "sanskritLippy": "Evam prāpter mahimnash-cha pratyaham pari-chintanam ।\\nPrabhoh prasannatāyāsh-cha kāryam sthireṇa chetasā ॥149॥",
      "audioURL1": "https://baps.box.com/shared/static/m9l54by0v3dwinods491etb1jd8ojybc.mp3",
      "audioURL": "https://baps.box.com/shared/static/u0yq0znzdmcclgjj99px7324ht9st99d.mp3"
    },
    {
      "id": 128,
      "shlokas": "Shloka 150",
      "englishText": "Realizing one’s ātmā to be distinct from the three bodies, the three states, and the three qualities, one should every day believe oneself as being one with Aksharbrahman.",
      "gujaratiText": "Potānā ātmāne traṇ deh, traṇ avasthā tathā traṇ guṇthī judo samajī tenī Akṣharbrahma sāthe ekatānī vibhāvanā pratidin karavī.",
      "sanskritLippy": "Deha-traya-tryavasthāto gnātvā bhedam guṇa-trayāt ।\\nSvātmano Brahmaṇaikatvam prati-dinam vibhāvayet ॥150॥",
      "audioURL1": "https://baps.box.com/shared/static/chmlso039dshwge0842niz8rxjvqhcqu.mp3",
      "audioURL": "https://baps.box.com/shared/static/thoqhu1eldhkws2797wva90vwkirbh1r.mp3"
    },
    {
      "id": 129,
      "shlokas": "Shloka 151",
      "englishText": "Daily, one should reflect on the impermanent nature of the world and on one’s ātmā as eternal and sachchidānand.",
      "gujaratiText": "Dar-roj jagatnā nāshavant-paṇānu anusandhān karavu ane potānā ātmānī nityatā tathā sachchidānand-paṇānu chintavan karavu.",
      "sanskritLippy": "Pratyaham anusandheyā jagato nāsha-shīlatā ।\\nSvātmano nityatā chintyā sach-chid-ānanda-rūpatā ॥151॥",
      "audioURL1": "https://baps.box.com/shared/static/zypqwkb5bnbsnlhuw6jrp9g4l6h54rmd.mp3",
      "audioURL": "https://baps.box.com/shared/static/q44otiex8swh7wjpd7ure15hevxe0qvb.mp3"
    },
    {
      "id": 130,
      "shlokas": "Shloka 152",
      "englishText": "One should understand that all which has happened,\\nwhich is happening, and which will happen is solely due to Swaminarayan Bhagwan’s will and only for my benefit.",
      "gujaratiText": "Je thaī gayu chhe, thaī rahyu chhe ane je kānī āgaḷ thashe te badhu ja Swāminārāyaṇ Bhagwānnī ichchhāthī mārā hit māṭe ja thayu chhe em mānavu.",
      "sanskritLippy": "Bhūtam yach-cha bhavad yach-cha yad-evā’gre bhaviṣhyati ।\\nSarvam tan me hitāyaiva Swāminārāyaṇechchhayā ॥152॥",
      "audioURL1": "https://baps.box.com/shared/static/7xn52fmdgg9wsft7gzqt8jtllvnlc3jl.mp3",
      "audioURL": "https://baps.box.com/shared/static/4bqpgeo23lxtg4g2lohtku68oubep1a6.mp3"
    },
    {
      "id": 131,
      "shlokas": "Shloka 153",
      "englishText": "One should daily pray to Swaminarayan Bhagwan and the Brahmaswarup guru with faith and devotion.",
      "gujaratiText": "Swāminārāyaṇ Bhagwān tathā brahmaswarūp gurune pratidin vishvās ane bhakti-bhāvthī prārthanā karavī.",
      "sanskritLippy": "Prārthanam pratyaham kuryād vishvāsa-bhakti-bhāvataha ।\\nGuror Brahmaswarūpasya Swāminārāyaṇa-Prabhoho ॥153॥",
      "audioURL1": "https://baps.box.com/shared/static/r7f82xw41ypnt0qoun7td9zg33h5rd1t.mp3",
      "audioURL": "https://baps.box.com/shared/static/vbyiwpbp896efc44f4tvd4twqz9uyvoo.mp3"
    },
    {
      "id": 132,
      "shlokas": "Shloka 154",
      "englishText": "When one experiences impulses of egotism, jealousy, lust, anger, and other base instincts, one should calmly reflect: ‘I am akshar; I am a servant of Purushottam.’",
      "gujaratiText": "Mān, īrṣhyā, kām, krodh ityādi doṣhono āveg āve tyāre ‘Hu Akṣhar chhu, Puruṣhottamno dās chhu’ em shānt mane chintavan karavu.",
      "sanskritLippy": "Mānerṣhyā-kāma-krodhādi-doṣhā’vego bhavet tadā ।\\nAkṣharam-aham ityādi shānta-manā vichintayet ॥154॥",
      "audioURL1": "https://baps.box.com/shared/static/8iw2tbbxjy86opprf2ljd56qkbroxcj8.mp3",
      "audioURL": "https://baps.box.com/shared/static/7026t4nupj83dj6fv56dmesvjquwzyf5.mp3"
    },
    {
      "id": 133,
      "shlokas": "Shloka 155",
      "englishText": "Also, one should remain strong in the belief that Swaminarayan Bhagwan himself, who is the destroyer of all base instincts, is always with me.",
      "gujaratiText": "Ane sarva doṣhonu nivāraṇ karanārā sākṣhāt Swāminārāyaṇ Bhagwān sadaiv mārī sāthe chhe em baḷ rākhavu.",
      "sanskritLippy": "Mayā saha sadaivā’sti sarva-doṣha-nivārakaha ।\\nSwāminārāyaṇah sākṣhād evam balam cha dhārayet ॥155॥",
      "audioURL1": "https://baps.box.com/shared/static/8totbb8uykf2zht4f1uw70byy65rvr4j.mp3",
      "audioURL": "https://baps.box.com/shared/static/4pyopnislnpgs1y159axyt0ge9tdjv1e.mp3"
    },
    {
      "id": 134,
      "shlokas": "Shloka 156-157",
      "englishText": "One should always observe swadharma and renounce pardharma. Swadharma means to observe the commands of Bhagwan and the guru. The wise mumukshu should realize that pardharma is disregarding their instructions and acting wilfully.",
      "gujaratiText": "Swadharmanu sadā pālan karavu. Par-dharmano tyāg karavo. Bhagwān ane gurunī āgnānu pālan karavu te swadharma chhe. Temanī āgnāno tyāg karī potānā mannu dhāryu karavāmā āve tene vivekī mumukṣhue par-dharma jāṇavo.",
      "sanskritLippy": "Sva-dharmam pālayen-nityam para-dharmam pari-tyajet ।\\nSva-dharmo Bhagavad-gurvor āgnāyāh pari-pālanam ॥156॥\\nTad-āgnām yat pari-tyajya kriyate sva-mano-dhṛutam ।\\nPara-dharmah sa vigneyo vivekibhir mumukṣhubhihi ॥157॥",
      "audioURL1": "https://baps.box.com/shared/static/57zownvvcr2iv9vo5rythqwe617f07m1.mp3",
      "audioURL": "https://baps.box.com/shared/static/rkfon0wlasftur2setbuderh61ql0ol2.mp3"
    },
    {
      "id": 135,
      "shlokas": "Shloka 158",
      "englishText": "One should avoid even [apparently] beneficial actions that impede devotion, transgress the niyams of satsang or cause one to lapse from dharma.",
      "gujaratiText": "Je karma faḷ āpe tevu hoy tem chhatā bhaktimā bādh karatu hoy, satsangnā niyamthī viruddha hoy tathā je ācharavāthī dharmano lop thato hoy tevā karmanu ācharaṇ na karavu.",
      "sanskritLippy": "Satsanga-niyamād yaddhi viruddham dharma-lopakam ।\\nFala-dam api nā’charyam bhaved yad bhakti-bādhakam ॥158॥",
      "audioURL1": "https://baps.box.com/shared/static/d380vbv2xyuvuc7yp8fvbwo8ol0knusd.mp3",
      "audioURL": "https://baps.box.com/shared/static/qyobc2okbehn5155elgi3xds8ovqmxkn.mp3"
    },
    {
      "id": 136,
      "shlokas": "Shloka 159",
      "englishText": "One should offer appropriate respect to those who are senior in age, possess greater wisdom or are more virtuous by bowing reverently, using polite speech and expressing other forms of regard.",
      "gujaratiText": "Vaye karīne, gnāne karīne ke guṇe karīne je moṭā hoy temanu ādar thakī praṇām tathā madhur-vachanādike karīne yathochit sanmān karavu.",
      "sanskritLippy": "Ādareṇa praṇāmaish-cha madhura-vachanādibhihi ।\\nYatho-chitam hi sanmānyā vṛuddhā gnāna-vayo-guṇaihi ॥159॥",
      "audioURL1": "https://baps.box.com/shared/static/fbw2usc3a8ktswtjxnne3rrmwqdast5o.mp3",
      "audioURL": "https://baps.box.com/shared/static/5a39vph8jljjhk2xde15sqa3ng0lg6m1.mp3"
    },
    {
      "id": 137,
      "shlokas": "Shloka 160",
      "englishText": "One should always respect the learned, seniors and teachers. According to one’s capacity, one should honour them with good words and other such deeds.",
      "gujaratiText": "Vidvāno, vaḍīlo tathā adhyāpakone sadā ādar āpavo. Sārā vachan ādi kriyāo dvārā potānī shakti pramāṇe temano satkār karavo.",
      "sanskritLippy": "Sadaivā’daraṇīyā hi vidvad-variṣhṭha-shikṣhakāhā ।\\nYathā-shakti cha sat-kāryāh sādhu-vādādi-karmaṇā ॥160॥",
      "audioURL1": "https://baps.box.com/shared/static/r6qr5db9w3n0dzth8nx75jczfbn406wy.mp3",
      "audioURL": "https://baps.box.com/shared/static/5b813iwfmlo0ggzrwth6mnx9v6mt478q.mp3"
    },
    {
      "id": 138,
      "shlokas": "Shloka 161",
      "englishText": "One should address each individual according to their virtues, achievements and other merits. One should encourage them in noble works according to their abilities.",
      "gujaratiText": "Vyaktinā guṇ tathā kārya ādine anusāre tenu sambodhan karavu. Yathāshakti tene sārā kāryomā protsāhan āpavu.",
      "sanskritLippy": "Jana-sambodhanam kuryād yathā-kārya-guṇādikam ।\\nSamvardhayet tad-utsāham yathā-shakti su-karmasu ॥161॥",
      "audioURL1": "https://baps.box.com/shared/static/3n7ehyew3eupfq7w5mh1sowz1zfa65el.mp3",
      "audioURL": "https://baps.box.com/shared/static/bfbit7rikpnym93dclbf002svhb1wzvi.mp3"
    },
    {
      "id": 139,
      "shlokas": "Shloka 162",
      "englishText": "One should speak words which are true, beneficial and loving. One should never falsely accuse any individual.",
      "gujaratiText": "Satya, hit ane priya vāṇī bolavī. Koī manuṣhyanī upar kyārey mithyā apavādnu āropaṇ na karavu.",
      "sanskritLippy": "Satyām vaded hitām chaiva vaded vāṇīm priyām tathā ।\\nMithyā’ropyo’pavādo na kasminsh-chit karhichij-jane ॥162॥",
      "audioURL1": "https://baps.box.com/shared/static/2fdmnhivlbwu0aico7xrppvec7he1bfk.mp3",
      "audioURL": "https://baps.box.com/shared/static/4hkjbeb7u4rgfnihsckac6x1rrm11ydz.mp3"
    },
    {
      "id": 140,
      "shlokas": "Shloka 163",
      "englishText": "One should never utter unpleasant speech that is offensive, hurts its listener and is defamatory, harsh or hateful.",
      "gujaratiText": "Apshabdothī yukta, sāmbhaḷnārne dukh kare tevī, nindya, kaṭhor ane dveṣh bharelī kutsit vāṇī na bolavī.",
      "sanskritLippy": "Na vadet kutsitām vācham apa-shabda-kalankitām ।\\nShrotṛu-dukha-karīm nindyām kaṭhorām dveṣha-garbhiṇīm ॥163॥",
      "audioURL1": "https://baps.box.com/shared/static/f25xyqwdztcnqw1cz483uman05hy9m28.mp3",
      "audioURL": "https://baps.box.com/shared/static/wz571ulowapm9rqs6oeqwjf8oms6ive4.mp3"
    },
    {
      "id": 141,
      "shlokas": "Shloka 164",
      "englishText": "One should never speak untruth. One should express truth that is beneficial, but not utter even truth that may harm others.",
      "gujaratiText": "Asatya kyārey na bolavu. Hit kare tevu satya bolavu. Anyanu ahit kare tevu satya paṇ na bolavu.",
      "sanskritLippy": "Asatyam na vadet kvāpi vadet satyam hitā’vaham ।\\nSatyam api vaden-naiva yat syād anyā’hitā’vaham ॥164॥",
      "audioURL1": "https://baps.box.com/shared/static/ofkjijornufd0ouqhmhp40ixdf413ahc.mp3",
      "audioURL": "https://baps.box.com/shared/static/5o5boc5uz5ol1uy4joyc4lp4rfs7wh4o.mp3"
    },
    {
      "id": 142,
      "shlokas": "Shloka 165",
      "englishText": "One should never speak of another’s drawbacks or flaws. Doing so causes unrest and results in the displeasure of Bhagwan and the guru.",
      "gujaratiText": "Kyārey koīnā avaguṇ ke doṣhnī vāt na karavī. Em karavāthī ashānti thāy ane Bhagwān tathā guruno kurājīpo thāy.",
      "sanskritLippy": "Anyā’vaguṇa-doṣhādi-vārtām kadā’pi nochcharet ।\\nTathā kṛute tvashāntih syād aprītish-cha Harer guroho ॥165॥",
      "audioURL1": "https://baps.box.com/shared/static/90gps4d8qkehy4fzg0ytpurgorxx2bss.mp3",
      "audioURL": "https://baps.box.com/shared/static/z6op4pqqhssb5nf8ynkm95dz83t0sdqc.mp3"
    },
    {
      "id": 143,
      "shlokas": "Shloka 166",
      "englishText": "If extremely necessary, it is acceptable to convey the truth with pure intent to an authorized person.",
      "gujaratiText": "Atyant āvashyak hoy to parishuddha bhāvanāthī adhikṛut vyaktine satya kahevāmā doṣh nathī.",
      "sanskritLippy": "Atyantā’vashyake nūnam pari-shuddhena bhāvataha ।\\nSatya-proktau na doṣhah syād adhikāra-vatām puraha ॥166॥",
      "audioURL1": "https://baps.box.com/shared/static/k40w2v7isagpbt2o8rcy8maxonhd8ytj.mp3",
      "audioURL": "https://baps.box.com/shared/static/iri1nkgc8l20tr8zgtxhcsf95ngky61f.mp3"
    },
    {
      "id": 144,
      "shlokas": "Shloka 167",
      "englishText": "One should never act or think in a way that is hurtful or damaging to others or that increases conflict.",
      "gujaratiText": "Jeṇe karīne anyanu ahit thāy, tene dukh thāy ke klesh vadhe tevā āchār ke vichār kyārey na karavā.",
      "sanskritLippy": "Āchāro vā vichāro vā tādṛuk kāryo na karhichit ।\\nAnyeṣhām ahitam dukham yena syāt klesha-vardhanam ॥167॥",
      "audioURL1": "https://baps.box.com/shared/static/vuokcflfso4kdcm22stx6g3fbxl0yi21.mp3",
      "audioURL": "https://baps.box.com/shared/static/y566gv9c9x6el4keiz4agmisls5cpoxr.mp3"
    },
    {
      "id": 145,
      "shlokas": "Shloka 168",
      "englishText": "With suhradaybhāv, recollect the virtues of devotees. One should never view their flaws or offend them in any way.",
      "gujaratiText": "Suhṛudaybhāv rākhī bhaktonā shubh guṇone sambhāravā. Temano avaguṇ na levo ane koī rīte droh na karavo.",
      "sanskritLippy": "Suhṛad-bhāvena bhaktānām shubha-guṇa-gaṇān smaret ।\\nNa grāhyo’vaguṇas-teṣhām drohah kāryo na sarvathā ॥168॥",
      "audioURL1": "https://baps.box.com/shared/static/xn53kpafmvb3mwerhxv501mw985xmsn4.mp3",
      "audioURL": "https://baps.box.com/shared/static/2o26jsiumu17l163opfh0sygek34wq3j.mp3"
    },
    {
      "id": 146,
      "shlokas": "Shloka 169",
      "englishText": "In happy times do not get carried away and in unhappy times do not become discouraged, since everything occurs by Swaminarayan Bhagwan’s wish.",
      "gujaratiText": "Sukhmā chhakī na javu ane dukhmā udveg na pāmavo. Kāraṇ ke badhu Swāminārāyaṇ Bhagwānnī ichchhāthī pravarte chhe.",
      "sanskritLippy": "Sukhe noch-chhṛunkhalo bhūyād dukhe nodvegam āpnuyāt ।\\nSwāminārāyaṇechchhātah sarvam pravartate yataha ॥169॥",
      "audioURL1": "https://baps.box.com/shared/static/jrm21lhen51qqixqkt18l4rag6cux98t.mp3",
      "audioURL": "https://baps.box.com/shared/static/9yon7wnwwx75xqvp4tugj50lxz1b6vtg.mp3"
    },
    {
      "id": 147,
      "shlokas": "Shloka 170",
      "englishText": "One should never argue or quarrel with anyone. One should always be well mannered and remain calm.",
      "gujaratiText": "Kyārey paṇ koīnī sāthe vivād ke kalah na ja karavo. Hammeshā vivekthī vartavu ane shānti rākhavī.",
      "sanskritLippy": "Vivādah kalaho vā’pi naiva kāryah kadāchana ।\\nVartitavyam vivekena rakṣhyā shāntish-cha sarvadā ॥170॥",
      "audioURL1": "https://baps.box.com/shared/static/ogh0qi9zq1wh3nn89ahs4dr65mmevsx3.mp3",
      "audioURL": "https://baps.box.com/shared/static/o851xa0fdk9ddhbsepp0fdemn11ftyzq.mp3"
    },
    {
      "id": 148,
      "shlokas": "Shloka 171",
      "englishText": "One should never be harsh in speech, action, thought or writing.",
      "gujaratiText": "Koī paṇ manuṣhye potānā vachan, vartan, vichār tathā lakhāṇmā kaṭhortā kyārey na rākhavī.",
      "sanskritLippy": "Vachane vartane kvāpi vichāre lekhane tathā ।\\nKaṭhoratām bhajen-naiva janah ko’pi kadāchana ॥171॥",
      "audioURL1": "https://baps.box.com/shared/static/ii8ahhsfmnbv3lv63iu4vj65ojt594bj.mp3",
      "audioURL": "https://baps.box.com/shared/static/xwji1poln5n06tv09khisund2i96yfkh.mp3"
    },
    {
      "id": 149,
      "shlokas": "Shloka 172",
      "englishText": "Householder satsangis should serve their mother and father. They should bow to their feet every day.",
      "gujaratiText": "Gṛuhasth satsangīe mātā-pitānī sevā karavī. Pratidin temanā charaṇomā namaskār karavā.",
      "sanskritLippy": "Sevām mātuh pituh kuryād gṛuhī satsangam āshritaha ।\\nPrati-dinam namaskāram tat-pādeṣhu nivedayet ॥172॥",
      "audioURL1": "https://baps.box.com/shared/static/mcbfcdca4kiu5omfaapc21s7qwygsvsv.mp3",
      "audioURL": "https://baps.box.com/shared/static/c559wjajnpo1q8tkbqgxo63sfya3paon.mp3"
    },
    {
      "id": 150,
      "shlokas": "Shloka 173",
      "englishText": "A wife should serve her father-in-law as her own father and mother-in-law as her own mother. A father- and mother-in-law should care for their daughter-in-law as they would for their own daughter.",
      "gujaratiText": "Vahue sasarānī sevā pitātulya gaṇī ane sāsunī sevā mātātulya gaṇī karavī. Sāsu-sasarāe paṇ putra-vadhūnu potānī putrīnī jem pālan karavu.",
      "sanskritLippy": "Shvashurah pitṛuvat sevyo vadhvā shvashrūsh-cha mātṛuvat ।\\nSva-putrīvat snuṣhā pālyā shvashrvā’pi shvashureṇa cha ॥173॥",
      "audioURL1": "https://baps.box.com/shared/static/nqhx5i033o6n4eswyovekp04vhqd4icj.mp3",
      "audioURL": "https://baps.box.com/shared/static/gkwxb47ve1f0q4vaatrxxz6mo13tq9q2.mp3"
    },
    {
      "id": 151,
      "shlokas": "Shloka 174",
      "englishText": "Householders should diligently nurture their sons and daughters through satsang, education and other activities. They should affectionately care for their other relatives according to their means.",
      "gujaratiText": "Gṛuhasthoe dīkarā-dīkarīonu satsang, shikṣhaṇ vagerethī sārī rīte poṣhaṇ karavu. Anya sambandhīonī potānī shakti pramāṇe bhāvthī sevā karavī.",
      "sanskritLippy": "Sampālyāh putra-putryash-cha satsanga-shikṣhaṇādinā ।\\nAnye sambandhinah sevyā yathā-shakti cha bhāvataha ॥174॥",
      "audioURL1": "https://baps.box.com/shared/static/sdw4z9t47etchw6xnzkpx5g5vpjlvd3z.mp3",
      "audioURL": "https://baps.box.com/shared/static/ogjrd2gsd84movuu8elk0r8sfv24a5o3.mp3"
    },
    {
      "id": 152,
      "shlokas": "Shloka 175",
      "englishText": "One should speak pleasantly at home. One should renounce bitter speech and not harm others with malicious intent.",
      "gujaratiText": "Gharmā madhur vāṇī bolavī. Kaḍavī vāṇīno tyāg karavo ane malin āshaythī koīne pīḍā na pahonchāḍavī.",
      "sanskritLippy": "Gṛuhe hi madhurām vāṇīm vaded vācham tyajet kaṭum ।\\nKam api pīḍitam naiva prakuryād malinā’shayāt ॥175॥",
      "audioURL1": "https://baps.box.com/shared/static/6wb74wbi1n42c3wu0pxci3xsgzq081jq.mp3",
      "audioURL": "https://baps.box.com/shared/static/8ygqvvgc3nfjd9ndknby4g744c7dqjoo.mp3"
    },
    {
      "id": 153,
      "shlokas": "Shloka 176",
      "englishText": "Householders should joyously eat meals together at home and provide hospitality to guests according to their means.",
      "gujaratiText": "Gṛuhasthoe potānā gharmā bhegā maḷī ānande bhojan karavu ane ghare padhārelā atithinī potānī shakti pramāṇe sambhāvanā karavī.",
      "sanskritLippy": "Militvā bhojanam kāryam gṛuhasthaih sva-gṛuhe mudā ।\\nAtithir hi yathā-shakti sambhāvya āgato gṛuham ॥176॥",
      "audioURL1": "https://baps.box.com/shared/static/8pj60gqp2jwtwa51mp4l8qkvd57oajtz.mp3",
      "audioURL": "https://baps.box.com/shared/static/yc8pbc8pjzy1zz5u7z56eui3ff98flks.mp3"
    },
    {
      "id": 154,
      "shlokas": "Shloka 177",
      "englishText": "In the event of a death or other sadoccasions, one should perform additional acts of devotion, sing kirtans, engage in discourses and remember Akshar-Purushottam Maharaj.",
      "gujaratiText": "Maraṇ ādi prasangomā visheṣh bhajan-kīrtan karavu, kathā karavī, Akṣhar-Puruṣhottam Mahārājnu smaraṇ karavu.",
      "sanskritLippy": "Maraṇādi-prasangeṣhu kathā-bhajana-kīrtanam ।\\nKāryam visheṣhatah smāryo hyakṣhara-Puruṣhottamah ॥177॥",
      "audioURL1": "https://baps.box.com/shared/static/ae8vd5bx9j7sz67tgqjtxdcrv267oqyn.mp3",
      "audioURL": "https://baps.box.com/shared/static/ne913u7ffqrkuzyey6as57k6t2kq0lx2.mp3"
    },
    {
      "id": 155,
      "shlokas": "Shloka 178",
      "englishText": "One should always impart sanskārs to one’s sons and daughters by teaching them the divine principles of satsang, good conduct and virtues.",
      "gujaratiText": "Dīkarī ke dīkarā evā potānā santānone satsangnā divya siddhānto, sārā ācharaṇo ane sadguṇo vaḍe sadā sanskār āpavā.",
      "sanskritLippy": "Putrī-putrātmikā svasya sanskāryā santatih sadā ।\\nSatsanga-divya-siddhāntaih sad-āchāraish-cha sadguṇaihi ॥178॥",
      "audioURL1": "https://baps.box.com/shared/static/3f25enhhb9rkqjjasst5osvql07jc348.mp3",
      "audioURL": "https://baps.box.com/shared/static/4hdu9agaxn4iqbgrbmpmdmf45706j6iv.mp3"
    },
    {
      "id": 156,
      "shlokas": "Shloka 179",
      "englishText": "From when a child is in the womb, one should instil sanskārs and conviction in Akshar-Purushottam Maharaj by reading the sacred texts of satsang and through other [noble] acts.",
      "gujaratiText": "Santān jyāre garbhamā hoy tyārthī ja tene satsang sambandhī shāstronu vānchan vagere karīne sanskār āpavā ane Akṣhar-Puruṣhottam Mahārājne viṣhe niṣhṭhā pūravī.",
      "sanskritLippy": "Satsanga-shāstra-pāṭhādyair-garbha-sthām eva santatim ।\\nSanskuryāt pūrayen-niṣhṭhām Akṣhara-Puruṣhottame ॥179॥",
      "audioURL1": "https://baps.box.com/shared/static/72ezseil7fbi79n24ldmlna82kd757fc.mp3",
      "audioURL": "https://baps.box.com/shared/static/u2hdxvi7snw4fm3uec6hye8135jixd74.mp3"
    },
    {
      "id": 157,
      "shlokas": "Shloka 180",
      "englishText": "Men should never look at women with a wrong intent. In the same manner, women should also never look at men with wrong intent.",
      "gujaratiText": "Puruṣho kyārey kudṛuṣhṭie karīne strīone na jue. Te ja rīte strīo paṇ kudṛuṣhṭie karīne puruṣhone na jue.",
      "sanskritLippy": "Kudṛaṣhṭyā puruṣhair naiva striyo dṛushyāh kadāchana ।\\nEvam eva kudṛuṣhṭyā cha strībhir dṛushyā na pūruṣhāhā ॥180॥",
      "audioURL1": "https://baps.box.com/shared/static/r78ydnymid8h8apfmlbfzix91kwxfdsx.mp3",
      "audioURL": "https://baps.box.com/shared/static/hl8xtq93jeplx2onktr8kny72h6uz9cl.mp3"
    },
    {
      "id": 158,
      "shlokas": "Shloka 181",
      "englishText": "Except in emergency situations, married men should never remain alone anywhere with women other than their wife.",
      "gujaratiText": "Gṛuhasthāshrammā rahyā evā puruṣhoe potānī patnī sivāya anya strīo sāthe āpatkāḷ vinā kyāy paṇ ekāntmā na rahevu.",
      "sanskritLippy": "Svīya-patnītarābhis-tu rahasi vasanam saha ।\\nĀpat-kālam vinā kvāpi na kuryur gṛuhiṇo narāhā ॥181॥",
      "audioURL1": "https://baps.box.com/shared/static/5xqtiavcd6a034cnwjxvi0ajhzknch9f.mp3",
      "audioURL": "https://baps.box.com/shared/static/ke1j0gtkddvazqn8f2io9j312y1z8ybk.mp3"
    },
    {
      "id": 159,
      "shlokas": "Shloka 182",
      "englishText": "Similarly, [married] women should never remain alone with men other than their husband, except in emergency situations.",
      "gujaratiText": "Te ja rīte strīoe paṇ potānā pati sivāy anya puruṣho sāthe āpatkāḷ vinā ekāntmā na rahevu.",
      "sanskritLippy": "Tathaiva na hi nāryo’pi tiṣhṭheyuh sva-patītaraihi ।\\nPuruṣhaih sākam-ekānte hyāpatti-samayam vinā ॥182॥",
      "audioURL1": "https://baps.box.com/shared/static/5jp5xrjg6r2dnrjyk5pmn5cv90iyp3ce.mp3",
      "audioURL": "https://baps.box.com/shared/static/idiw0beyezt1z6g6uph6ppyt92dt8gg1.mp3"
    },
    {
      "id": 160,
      "shlokas": "Shloka 183",
      "englishText": "A male should not touch a female who is not closely related; however, he may respectfully touch one who is closely related. Similarly, a female should not touch a male who is not closely related; however, she may respectfully touch one who is closely related.",
      "gujaratiText": "Puruṣhe samīp sambandh vinānī strīno sparsh na karavo. Te ja rīte strīe potāne samīp sambandh vinānā anya puruṣhno sparsh na karavo.",
      "sanskritLippy": "Narah samīpa-sambandha-hīnām striyam spṛushen-na hi ।\\nNaiva spṛushet tathā nārī tādṛusham puruṣhāntaram ॥183॥",
      "audioURL1": "https://baps.box.com/shared/static/2b4x4ar0epshrz26jjqld1zcc3pw3hi1.mp3",
      "audioURL": "https://baps.box.com/shared/static/jdbcnq24eqn4rysqske4hscm3jqqnoef.mp3"
    },
    {
      "id": 161,
      "shlokas": "Shloka 184",
      "englishText": "In emergency situations, it is not a fault to touch others to protect or save them. However, if there is no emergency, then always obey the niyams.",
      "gujaratiText": "Āpatkāḷ prāpt thatā anyanī rakṣhā māṭe sparsh karavāmā doṣh nathī. Parantu jo āpatkāḷ na hoy to sadāy niyamonu pālan karavu.",
      "sanskritLippy": "Āpat-kāle’nya-rakṣhārtham sparshe doṣho na vidyate ।\\nAnyathā niyamāh pālyā anāpattau tu sarvadā ॥184॥",
      "audioURL1": "https://baps.box.com/shared/static/7rp5lywh78wyncu9gf9qpy73nsbxqec4.mp3",
      "audioURL": "https://baps.box.com/shared/static/0a8stt8di1n0yon3ls2yxwv1m2cdtzim.mp3"
    },
    {
      "id": 162,
      "shlokas": "Shloka 185",
      "englishText": "One should never view dramas, films or other media that contain obscene scenes which destroy one’s dharma and sanskārs.",
      "gujaratiText": "Dharma ane sanskārono nāsh kare evā ashlīl dṛushyo jemā āvatā hoy tevā nāṭako ke chal-chitro vagere kyārey na jovā.",
      "sanskritLippy": "Ashlīlam yatra dṛushyam syād dharma-sanskāra-nāshakam ।\\nNāṭaka-chala-chitrādi tan-na pashyet kadāchana ॥185॥",
      "audioURL1": "https://baps.box.com/shared/static/nawrjtjxdbs5fgtt99wzsmuti1a63chw.mp3",
      "audioURL": "https://baps.box.com/shared/static/hg9z7xtkuuc2ir0nebxfcn7txg2yab9p.mp3"
    },
    {
      "id": 163,
      "shlokas": "Shloka 186",
      "englishText": "Satsangis should not associate with people who have addictions, are shameless or are adulterous.",
      "gujaratiText": "Satsangī-janoe je manuṣhya vyasanī, nirlajja tathā vyabhichārī hoy teno sang na karavo.",
      "sanskritLippy": "Manuṣhyo vyasanī yah syād nirlajjo vyabhichāravān ।\\nTasya sango na kartavyah satsangam-āshritair-janaihi ॥186॥",
      "audioURL1": "https://baps.box.com/shared/static/jndcrnwogdj1x377fp9jam74y2l98jqx.mp3",
      "audioURL": "https://baps.box.com/shared/static/vjgh8wb3hrbr75eb3r7466wy0kupiay5.mp3"
    },
    {
      "id": 164,
      "shlokas": "Shloka 187",
      "englishText": "To protect one’s dharma, female devotees should not associate with immoral women and should firmly abide by the niyams.",
      "gujaratiText": "Strīoe potānā dharmanī rakṣhā māṭe chāritryahīn strīno sang na karavo ane dṛuḍhpaṇe niyamonu pālan karavu.",
      "sanskritLippy": "Sangash-chāritrya-hīnāyāh karaṇīyo na hi striyāhā ।\\nStrībhihi sva-dharma-rakṣhārtham pālyāsh-cha niyamā dṛaḍham ॥187॥",
      "audioURL1": "https://baps.box.com/shared/static/boz6mtld5z8z7kwtsxjc6p09or736vyb.mp3",
      "audioURL": "https://baps.box.com/shared/static/0znthei5cahbm0b3e0myhb4ucrhg4sum.mp3"
    },
    {
      "id": 165,
      "shlokas": "Shloka 188",
      "englishText": "One should not listen to talks or songs, read books or view scenes that increase one’s lustful desires.",
      "gujaratiText": "Jeṇe karīne kām-vāsanā vṛuddhi pāme tevī vāto ke gīto na sāmbhaḷavā, pustako na vānchavā tathā tevā dṛushyo na jovā.",
      "sanskritLippy": "Na tādṛuk-chhṛuṇuyād vācham gītam grantham paṭhenna cha ।\\nPashyen-na tādṛusham dṛashyam yasmāt kāma-vivardhanam ॥188॥",
      "audioURL1": "https://baps.box.com/shared/static/nggcfri5rhod38mjvda4ie4t15o483eu.mp3",
      "audioURL": "https://baps.box.com/shared/static/7nasruqb1svsr3lqzxxlvt94m32x3iqt.mp3"
    },
    {
      "id": 166,
      "shlokas": "Shloka 189",
      "englishText": "Transactions of wealth, possessions, land and other assets should always be conducted in writing, in the presence of a witness and by definitely following other such niyams.",
      "gujaratiText": "Dhan, dravya tathā jamīn ādinā leṇ-deṇmā hammeshā likhit karavu, sākṣhīe sahit karavu ityādi niyamo avashyapaṇe pāḷavā.",
      "sanskritLippy": "Dhana-dravya-dharādīnām sadā’dāna-pradānayoho ।\\nNiyamā lekha-sākṣhyādeh pālanīyā avashyataha ॥189॥",
      "audioURL1": "https://baps.box.com/shared/static/j9o4gbix01njrup0yt5xk0jpju0ryi8v.mp3",
      "audioURL": "https://baps.box.com/shared/static/6jzwqxr3q9ec5k2ftnbbkf093hymbjl8.mp3"
    },
    {
      "id": 167,
      "shlokas": "Shloka 190",
      "englishText": "All devotees should conduct their social dealings with even their relatives in writing and by following other such niyams.",
      "gujaratiText": "Sarva āshrit janoe potānā sambandhīo sāthe paṇ vyavahār prasange likhit karavu ityādi niyamo pāḷavā.",
      "sanskritLippy": "Prasange vyavahārasya sambandhibhir api svakaihi ।\\nLekhādi-niyamāh pālyāh sakalair āshritair janaihi ॥190॥",
      "audioURL1": "https://baps.box.com/shared/static/44p5feddoeje2zt8wkkmh8bdyrhqrn76.mp3",
      "audioURL": "https://baps.box.com/shared/static/1d0keqlzev5kaxi20s5yc7z6hw3thwh7.mp3"
    },
    {
      "id": 168,
      "shlokas": "Shloka 191",
      "englishText": "Satsangis should never engage in dealings with immoral persons and should be compassionate towards those who are meek and disadvantaged.",
      "gujaratiText": "Satsangīoe kyārey durjan sāthe vyavahār na karavo ane dīn-janne viṣhe dayāvān thavu.",
      "sanskritLippy": "Na kāryo vyavahārash-cha duṣhṭair janaih saha kvachit ।\\nDīna-janeṣhu bhāvyam cha satsangibhir dayā’nvitaihi ॥191॥",
      "audioURL1": "https://baps.box.com/shared/static/3pgfn9l3zl6j5p3ytho4ri2s4tktmi30.mp3",
      "audioURL": "https://baps.box.com/shared/static/1j5svi3pl33x4joeq92klf7tdtjgmsxr.mp3"
    },
    {
      "id": 169,
      "shlokas": "Shloka 192",
      "englishText": "Worldly deeds should never be performed in haste without due deliberation. They should, however, be performed with due judgment, after reflecting on their consequences and other such considerations.",
      "gujaratiText": "Laukik kārya kyārey vichāryā vagar tatkāḷ na karavu parantu faḷ vagereno vichār karīne vivek-pūrvak karavu.",
      "sanskritLippy": "Laukikam tvavichāryaiva sahasā karma nā’charet ।\\nFalādikam vichāryaiva vivekena tad ācharet ॥192॥",
      "audioURL1": "https://baps.box.com/shared/static/jtzgtss1lx14j9zj8mrlhzw9aj2tkim9.mp3",
      "audioURL": "https://baps.box.com/shared/static/3a4wli7j6pjkdfkbtg4g7br4w17g8n16.mp3"
    },
    {
      "id": 170,
      "shlokas": "Shloka 193",
      "englishText": "No one should ever accept bribes. Wealth should not be spent wastefully. One should spend according to one’s income.",
      "gujaratiText": "Koī paṇ manuṣhye kyārey lānch na levī. Dhanno vyarth vyay na karavo. Potānī āvakne anusāre dhanno vyay karavo.",
      "sanskritLippy": "Lunchā kadāpi na grāhyā kaishchid api janair iha ।\\nNaiva kāryo vyayo vyarthah kāryah svā’yā’nusārataha ॥193॥",
      "audioURL1": "https://baps.box.com/shared/static/ixs012jezdh8wgpxnngtssish1s882zq.mp3",
      "audioURL": "https://baps.box.com/shared/static/ewe3px8zneae3va6oomu0xsw2nvsytga.mp3"
    },
    {
      "id": 171,
      "shlokas": "Shloka 194",
      "englishText": "One should always accurately keep accounts of one’s income and expenditure in accordance with government laws.",
      "gujaratiText": "Prashāsannā niyamone anusarī hammeshā potānā āvak ane kharchanī nondh vyavasthit karavī.",
      "sanskritLippy": "Kartavyam lekhanam samyak svasyā’yasya vyayasya cha ।\\nNiyamān anusṛutyaiva prashāsana-kṛutān sadā ॥194॥",
      "audioURL1": "https://baps.box.com/shared/static/qi9186jlyx8cr68y4e3dz8dpv63yb0y6.mp3",
      "audioURL": "https://baps.box.com/shared/static/dh34gmwfpbaz9apdshsy2lb4t9wzka1l.mp3"
    },
    {
      "id": 172,
      "shlokas": "Shloka 195",
      "englishText": "According to one’s means, one should give one-tenth or one- twentieth of one’s income in Swaminarayan Bhagwan’s service and to attain his blessings.",
      "gujaratiText": "Potāne prāpt thatī āvakmāthī potānī shakti pramāṇe dashmo ke vīshmo bhāg Swāminārāyaṇ Bhagwānnī sevā-prasannatā māṭe arpaṇ karavo.",
      "sanskritLippy": "Svā’yāddhi dashamo bhāgo vinsho’thavā sva-shaktitaha ।\\nArpyah sevā-prasādārtham Swāminārāyaṇa-Prabhoho ॥195॥",
      "audioURL1": "https://baps.box.com/shared/static/zyrx1bxyuebk9euliufvvxaw4lb2lnp4.mp3",
      "audioURL": "https://baps.box.com/shared/static/uybs3slfs7biifcum5coktw9u9nuw0mx.mp3"
    },
    {
      "id": 173,
      "shlokas": "Shloka 196",
      "englishText": "Householders should save provisions, money and other possessions according to their needs, circumstances and means.",
      "gujaratiText": "Gṛuhasth potānā upyogne anusāre tathā samay-shakti anusār anāj, dravya ke dhanādino sangrah kare.",
      "sanskritLippy": "Svopayogā’nusāreṇa prakuryāt sangraham gṛuhī ।\\nAnna-dravya-dhanādīnām kāla-shaktyanusārataha ॥196॥",
      "audioURL1": "https://baps.box.com/shared/static/3nk4iuhh0hz8cbm8ds8e4468n2ra9rwr.mp3",
      "audioURL": "https://baps.box.com/shared/static/ifh2yxxmchxqkogzq4ckumpo6e84dmre.mp3"
    },
    {
      "id": 174,
      "shlokas": "Shloka 197",
      "englishText": "According to one’s means, one should provide suitable food, fruits, water and other sustenance for one’s domesticated animals and birds.",
      "gujaratiText": "Pāḷelā pashu-pakṣhī vagerenī anna, faḷ, jaḷ ityādi vaḍe yathāshakti uchit sambhāvanā karavī.",
      "sanskritLippy": "Anna-falādibhish-chaiva yathā-shakti jalādibhihi ।\\nPālitāh pashu-pakṣhyādyāh sambhāvyā hi yathochitam ॥197॥",
      "audioURL1": "https://baps.box.com/shared/static/q32b87r8kswiuduw7i4lwvew2slsfhyc.mp3",
      "audioURL": "https://baps.box.com/shared/static/6d78mp7ub7urll8rxy8klaaycqapywq0.mp3"
    },
    {
      "id": 175,
      "shlokas": "Shloka 198",
      "englishText": "One should not betray the trust of or deceive others in transactions involving wealth, objects, land or other commodities.",
      "gujaratiText": "Dhan, dravya ke bhūmi vagerenī leṇ-deṇmā vishvāsghāt tathā kapaṭ na karavā.",
      "sanskritLippy": "Dhana-dravya-dharādīnām pradānā’dānayoh punaha ।\\nVishvāsa-hananam naiva kāryam na kapaṭam tathā ॥198॥",
      "audioURL1": "https://baps.box.com/shared/static/rx9aj597nopumkav62pi45sd6le9bdjd.mp3",
      "audioURL": "https://baps.box.com/shared/static/k467ynw4e3kxmxcgd7d0q4j5h720663f.mp3"
    },
    {
      "id": 176,
      "shlokas": "Shloka 199",
      "englishText": "One should pay employees the amount of money or other forms of remuneration agreed upon, but should never give less.",
      "gujaratiText": "Karmachārīone jeṭalu dhan ādi āpavānu vachan āpyu hoy te vachan pramāṇe te dhan ādi āpavu paṇ kyārey ochhu na āpavu.",
      "sanskritLippy": "Pradātum karma-kāribhyah pratignātam dhanādikam ।\\nYathā-vācham pradeyam tat nonam deyam kadāchana ॥199॥",
      "audioURL1": "https://baps.box.com/shared/static/ds7rqel6nc9kze2xjzbppt7a3k0219ch.mp3",
      "audioURL": "https://baps.box.com/shared/static/viwnzxebiw7i7f8swovhp90syzqs0pcc.mp3"
    },
    {
      "id": 177,
      "shlokas": "Shloka 200",
      "englishText": "A satsangi should not commit betrayal. One should uphold one’s promise. A pledge should not be broken.",
      "gujaratiText": "Satsangīe vishvāsghāt na karavo. Āpelu vachan pāḷavu. Pratignānu ullanghan na karavu.",
      "sanskritLippy": "Naiva vishvāsa-ghātam hi kuryāt satsangam āshritaha ।\\nPālayed vachanam dattam pratignātam na langhayet ॥200॥",
      "audioURL1": "https://baps.box.com/shared/static/di88t5c312fx4pj60jbuzbvvnhpyggxv.mp3",
      "audioURL": "https://baps.box.com/shared/static/9asesnc9a99zkx15ju0j4la49ecva607.mp3"
    },
    {
      "id": 178,
      "shlokas": "Shloka 201-202",
      "englishText": "Rulers should follow dharma that is necessary to govern well. They should provide for the people, foster their growth and safeguard sanskārs. They should suitably arrange services for health, education, defence, electricity, food, water and other resources for the benefit of all.",
      "gujaratiText": "Sushāsan māṭe avashyapaṇe joīe te dharmone prashāsake pāḷavā. Lokonu bharaṇ-poṣhaṇ karavu. Sanskāronī rakṣhā karavī. Sarveno abhyuday thāy te māṭe swāsthya, shikṣhaṇ, sanrakṣhaṇ, vījaḷī, anāj, jaḷ vagere dvārā sārī rīte vyavasthā karavī.",
      "sanskritLippy": "Prashāstā pālayed dharmān-niyatā ye sushāsane ।\\nLokānām bharaṇam puṣhṭim kuryāt sanskāra-rakṣhaṇam ॥201॥\\nSvāsthya-shikṣhaṇa-samrakṣhā-vidyud-anna-jalādikaihi ।\\nSu-vyavasthā vidhātavyā sarvā’bhyudaya-hetunā ॥202॥",
      "audioURL1": "https://baps.box.com/shared/static/j1l6hi8bbxcxq87ol4ouwgd98fae5f0w.mp3",
      "audioURL": "https://baps.box.com/shared/static/jl408t6b1lwhzjq23sq6w54ea5ez1pfp.mp3"
    },
    {
      "id": 179,
      "shlokas": "Shloka 203",
      "englishText": "A person should be assigned suitable tasks after knowing and considering their qualities, abilities, inclinations and other such factors.",
      "gujaratiText": "Koī paṇ manuṣhyanā guṇ, sāmarthya, ruchi vagere jāṇīne; vichār karī tenā māṭe uchit evā kāryomā tene joḍavo.",
      "sanskritLippy": "Guṇa-sāmarthya-ruchyādi viditvaiva janasya tu ।\\nYad-uchiteṣhu kāryeṣhu yojanīyo vichārya saha ॥203॥",
      "audioURL1": "https://baps.box.com/shared/static/dypxmk3fixtpljiis3rswu38h0hr38mk.mp3",
      "audioURL": "https://baps.box.com/shared/static/081auz610i2767jkyi8glcijhpt2z1a9.mp3"
    },
    {
      "id": 180,
      "shlokas": "Shloka 204",
      "englishText": "One should happily reside in a country where one can worship Bhagwan and observe one’s dharma.",
      "gujaratiText": "Je deshne viṣhe Bhagwānnī bhakti thaī shake tathā potānā dharmanu pālan thaī shake tevā deshne viṣhe sukhe nivās karavo.",
      "sanskritLippy": "Shakyā Bhagavato yatra bhaktih sva-dharma-pālanam ।\\nTasmin deshe nivāso hi karaṇīyah sukhena cha ॥204॥",
      "audioURL1": "https://baps.box.com/shared/static/0zejjr6g17rzv9ptazujea8jcgwoujri.mp3",
      "audioURL": "https://baps.box.com/shared/static/ddgs1qg69wkhzjxlaxb6z7jqqwh7771d.mp3"
    },
    {
      "id": 181,
      "shlokas": "Shloka 205",
      "englishText": "A person who migrates elsewhere for educational, economic or other gains should continue to reverently practice satsang and observe niyams.",
      "gujaratiText": "Vidyā, dhan ādinī prāpti māṭe deshāntarmā jāy tyāre tyā paṇ ādarthī satsang karavo ane niyamonu pālan karavu.",
      "sanskritLippy": "Vidyā-dhanādikam prāptum deshāntaram gate’pi cha ।\\nSatsangam ādarāt tatra kuryān-niyama-pālanam ॥205॥",
      "audioURL1": "https://baps.box.com/shared/static/su623l0mzkd29ra2jll2cb73mwy2ys5o.mp3",
      "audioURL": "https://baps.box.com/shared/static/s6wrabyhhwu1ep463l7qwr40da3y3g2d.mp3"
    },
    {
      "id": 182,
      "shlokas": "Shloka 206",
      "englishText": "In the country one resides, one should observe the prescribed laws of that country in every way.",
      "gujaratiText": "Je deshmā pote rahetā hoy te deshnā prashāsanne sammat niyamonu sarva rīte pālan karavu.",
      "sanskritLippy": "Yad-deshe hi sva-vāsah syāt tad-desha-niyamāsh-cha ye ।\\nSarvathā pālanīyāste tat-prashāsana-sammatāhā ॥206॥",
      "audioURL1": "https://baps.box.com/shared/static/m3nel8t34wo0qu9xgkotwtknhyv6wn5r.mp3",
      "audioURL": "https://baps.box.com/shared/static/zvgtgp9zyidpt69v4lx9uge9uuo3mv7u.mp3"
    },
    {
      "id": 183,
      "shlokas": "Shloka 207",
      "englishText": "During adverse times, one should keep patience and joyously worship Akshar-Purushottam Maharaj within.",
      "gujaratiText": "Jyāre desh-kāḷādinu viparītpaṇu thaī āve tyāre dhīraj rākhī Akṣhar-Puruṣhottam Mahārājnu ānand sāthe antarmā bhajan karavu.",
      "sanskritLippy": "Sanjāte desha-kālāder vaiparītye tu dhairyataha ।\\nAntar-bhajet sānandam Akṣhara-Puruṣhottamam ॥207॥",
      "audioURL1": "https://baps.box.com/shared/static/n2zq7clnzq4i6pnz1oro31k5ovhl2r6r.mp3",
      "audioURL": "https://baps.box.com/shared/static/hod8m4eqze236vdq61550a3eg9c9agar.mp3"
    },
    {
      "id": 184,
      "shlokas": "Shloka 208",
      "englishText": "If unfavourable circumstances arise where one lives, one should leave that place and live happily elsewhere.",
      "gujaratiText": "Pote je sthānmā rahetā hoy te sthaḷe āpatkāḷ āvī paḍe tyāre te deshno tyāg karī anya deshne viṣhe sukhe nivās karavo.",
      "sanskritLippy": "Āpat-kāle tu samprāpte svīya-vāsa-sthale tadā ।\\nTam desham hi pari-tyajya stheyam deshāntare sukham ॥208॥",
      "audioURL1": "https://baps.box.com/shared/static/3ffpjxejx66xwaqyxdp64pvaqria318x.mp3",
      "audioURL": "https://baps.box.com/shared/static/m5cvt36fvmnosu0m1ncng3ncybmfeejv.mp3"
    },
    {
      "id": 185,
      "shlokas": "Shloka 209",
      "englishText": "Young boys and girls should acquire education from childhood. They should avoid inappropriate behaviour, bad company and addictions.",
      "gujaratiText": "Nānā bāḷako tathā bālikāoe bāḷpaṇthī ja vidyā prāpt karavī. Durāchār, kusang ane vyasanono tyāg karavo.",
      "sanskritLippy": "Kāryam bālaish-cha bālābhir bālyād vidyā’bhi-prāpaṇam ।\\nDurāchārah kusangash-cha tyājyāni vyasanāni cha ॥209॥",
      "audioURL1": "https://baps.box.com/shared/static/pav6v2u1bu5yd2tcq27ce9zernvctt7c.mp3",
      "audioURL": "https://baps.box.com/shared/static/qgrgsf3202odpheezi7ekkigppmsbvfp.mp3"
    },
    {
      "id": 186,
      "shlokas": "Shloka 210",
      "englishText": "Students should study with concentration, enthusiasm and respect. They should not waste their time in useless activities.",
      "gujaratiText": "Vidyārthīe potāno abhyās sthir chitte, utsāhthī ane ādar thakī karavo. Samayne vyarth karmomā bagāḍavo nahī.",
      "sanskritLippy": "Utsāhād ādarāt kuryāt svā’bhyāsam sthira-chetasā ।\\nVyarthatām na nayet kālam vidyārthī vyartha-karmasu ॥210॥",
      "audioURL1": "https://baps.box.com/shared/static/rj5pctqpewc60pph37ni2f8v1op00fg8.mp3",
      "audioURL": "https://baps.box.com/shared/static/6uio1r03vcii3fk4fox59tihc4sgh01a.mp3"
    },
    {
      "id": 187,
      "shlokas": "Shloka 211",
      "englishText": "From childhood, one should strengthen the virtues of sevā, humility and other virtues. One should never lose courage or be fearful.",
      "gujaratiText": "Bāḷpaṇthī ja sevā, vinamratā vagere dṛuḍh karavā. Kyārey nirbaḷ na thavu ane bhay na pāmavo.",
      "sanskritLippy": "Bālyād eva dṛaḍhī-kuryāt sevā-vinamratādikam ।\\nNirbalatām bhayam chā’pi naiva gachchhet kadāchana ॥211॥",
      "audioURL1": "https://baps.box.com/shared/static/h8dtrt0ha7lzhn7oogc1snwajgeymomk.mp3",
      "audioURL": "https://baps.box.com/shared/static/ni4h9d7bwtjpdv4e08pfs4uken69mw31.mp3"
    },
    {
      "id": 188,
      "shlokas": "Shloka 212",
      "englishText": "From childhood, one should practice satsang, offer devotion and pray. One should daily perform puja and offer panchāng pranāms to one’s mother and father.",
      "gujaratiText": "Bāḷpaṇthī ja satsang, bhakti ane prārthanā karavā. Pratidin pūjā karavī tathā mātā-pitāne panchāng praṇām karavā.",
      "sanskritLippy": "Bālyād eva hi satsangam kuryād bhaktim cha prārthanām ।\\nKāryā prati-dinam pūjā pitroh panchānga-vandanā ॥212॥",
      "audioURL1": "https://baps.box.com/shared/static/611fmianyxgoisfeb9re6u1p5m8kpevk.mp3",
      "audioURL": "https://baps.box.com/shared/static/lcakrcbof6c5hwfeez50poma74ejsras.mp3"
    },
    {
      "id": 189,
      "shlokas": "Shloka 213",
      "englishText": "During adolescence and early adulthood, one should exercise greater self-control and refrain from improper physical contact, sights and other activities that destroy one’s energies [physical, mental and spiritual].",
      "gujaratiText": "Kumār tathā yuvān avasthāmā visheṣh sanyam pāḷavo. Shaktino nāsh kare evā ayogya sparsh, dṛushya vagereno tyāg karavo.",
      "sanskritLippy": "Visheṣha-sanyamah pālyah kaumārye yauvane tathā ।\\nAyogya-sparsha-dṛushyādyās-tyājyāh shakti-vināshakāhā ॥213॥",
      "audioURL1": "https://baps.box.com/shared/static/wq9igpys08xptyfnan14wkz7cly3tb68.mp3",
      "audioURL": "https://baps.box.com/shared/static/5uicx1z4tk5npiq8z0p8rvy0ozhbxr5b.mp3"
    },
    {
      "id": 190,
      "shlokas": "Shloka 214",
      "englishText": "One should only undertake ventures that are appropriate and lead to good outcomes and development. However, one should not engage in ventures that merely entertain one’s mind or gratify others.",
      "gujaratiText": "Sārā faḷne āpe tevu, unnati kare tevu ane uchit hoy tevu ja sāhas karavu. Je kevaḷ potānā mannu ane lokonu ranjan kare tevu sāhas na karavu.",
      "sanskritLippy": "Sat-falonnāyakam kuryād uchitam eva sāhasam ।\\nNa kuryāt kevalam yaddhi sva-mano-loka-ranjakam ॥214॥",
      "audioURL1": "https://baps.box.com/shared/static/q9xcll2vhejnelgv91wr7zqqh9r5v0qu.mp3",
      "audioURL": "https://baps.box.com/shared/static/hq9hs9s19lvb1j8cksyjfs8j68am8qrd.mp3"
    },
    {
      "id": 191,
      "shlokas": "Shloka 215",
      "englishText": "One should never be lazy in undertaking one’s important tasks. One should have faith in and love towards Bhagwan. One should daily perform puja and do satsang.",
      "gujaratiText": "Potāne avashya karavānā udyamne viṣhe kyārey āḷas na karavī. Bhagwānne viṣhe shraddhā ane prīti karavī. Pratidin pūjā karavī ane satsang karavo.",
      "sanskritLippy": "Niyatodyama-kartavye nā’lasyam āpnuyāt kvachit ।\\nShraddhām prītim Harau kuryāt pūjām satsangam anvaham ॥215॥",
      "audioURL1": "https://baps.box.com/shared/static/bq8a3mewt0oplux1656baul2lnwmuuf9.mp3",
      "audioURL": "https://baps.box.com/shared/static/5gjhc0gfhch11m9ddnkaogittj58kx9c.mp3"
    },
    {
      "id": 192,
      "shlokas": "Shloka 216",
      "englishText": "In this world, the company one keeps has great influence. The type of association moulds one’s life accordingly. Therefore, one should always keep the company of virtuous people and totally shun bad company.",
      "gujaratiText": "Ā lokmā sang baḷavān chhe. Jevo sang hoy tevu jīvan bane. Āthī sārā manuṣhyono sang karavo. Kusangno sarvathā tyāg karavo.",
      "sanskritLippy": "Sango’tra balavānl-loke yathā-sangam hi jīvanam ।\\nSatām sangam atah kuryāt kusangam sarvathā tyajet ॥216॥",
      "audioURL1": "https://baps.box.com/shared/static/s4cb7aqee4vqzlsgdd46oerbk70zolob.mp3",
      "audioURL": "https://baps.box.com/shared/static/euf9yp490oyeyu6l2gfjlgbxt9nh136w.mp3"
    },
    {
      "id": 193,
      "shlokas": "Shloka 217",
      "englishText": "One should renounce the company of those who are lustful, ungrateful, dishonest, hypocritical or deceitful.",
      "gujaratiText": "Je manuṣhya kāmāsakta, kṛutaghnī, lokone chhetarnār, pākhanḍī tathā kapaṭī hoy teno sang tyajavo.",
      "sanskritLippy": "Kāmā’sakto bhaved yo hi kṛutaghno loka-vanchakaha ।\\nPākhaṇḍī kapaṭī yash-cha tasya sangam pari-tyajet ॥217॥",
      "audioURL1": "https://baps.box.com/shared/static/tm5q8g8wm2mg450vtyvbiuus63wbnw9t.mp3",
      "audioURL": "https://baps.box.com/shared/static/bc9epzzghonk8cwai3gyombhcc44l1m3.mp3"
    },
    {
      "id": 194,
      "shlokas": "Shloka 218-219",
      "englishText": "One should not associate with those who deny Bhagwan and his incarnations, disapprove of upāsanā to Paramatma or believe Bhagwan, who eternally possesses a form, to be formless. Do not read such texts.",
      "gujaratiText": "Je manuṣhya Bhagwān ane temanā avatāronu khanḍan karato hoy, Paramātmānī upāsanānu khanḍan karato hoy ane sākār Bhagwānne nirākār mānato hoy teno sang na karavo. Tevā grantho na vānchavā.",
      "sanskritLippy": "Hares-tad-avatārāṇām khaṇḍanam vidadhāti yaha ।\\nUpāsteh khaṇḍanam yash-cha kurute Paramātmanaha ॥218 ॥\\nSākṛutikam Parabrahma manute yo nirākṛuti ।\\nTasya sango na kartavyas-tādṛug-granthān paṭhen-na hi ॥219॥",
      "audioURL1": "https://baps.box.com/shared/static/yxx5e66p90fxfbekl2cosctxajv4wead.mp3",
      "audioURL": "https://baps.box.com/shared/static/gxmllw7qwbdduzysqlxx77v6f6lvnzmt.mp3"
    },
    {
      "id": 195,
      "shlokas": "Shloka 220",
      "englishText": "One should renounce the company of those who decry mandirs and Bhagwan’s murtis or denounce truth, non-violence and other such righteous conduct.",
      "gujaratiText": "Je manuṣhya mandir ane Bhagwānnī mūrtionu khanḍan karato hoy, satya-ahinsā ādi dharmonu khanḍan karato hoy tenā sangno tyāg karavo.",
      "sanskritLippy": "Khaṇḍanam mandirāṇām yo mūrtīnām kurute Harehe ।\\nSatyā’hinsādi-dharmāṇām tasya sangam pari-tyajet ॥220॥",
      "audioURL1": "https://baps.box.com/shared/static/6qcn2q9pavbge65tidnz3v18q0ma5qxd.mp3",
      "audioURL": "https://baps.box.com/shared/static/xs49rdmvlytkr0qyx5avv5a83eg3p6hw.mp3"
    },
    {
      "id": 196,
      "shlokas": "Shloka 221",
      "englishText": "One should not associate with those who oppose taking refuge in a guru, Vedic texts or the path of bhakti.",
      "gujaratiText": "Je manuṣhya guru-sharaṇāgatino virodh karato hoy, Vaidik shāstronu khanḍan karato hoy, bhakti-mārgno virodh karato hoy teno sang na karavo.",
      "sanskritLippy": "Gurvāshraya-virodhī yo vaidika-shāstra-khaṇḍakaha ।\\nBhakti-mārga-virodhī syāt tasya sangam na chā’charet ॥221॥",
      "audioURL1": "https://baps.box.com/shared/static/xvtb1my9047k9gf6isucjul07mymv99b.mp3",
      "audioURL": "https://baps.box.com/shared/static/kujkxg0yyzeh3owz8prss1fswzl6t0bp.mp3"
    },
    {
      "id": 197,
      "shlokas": "Shloka 222",
      "englishText": "One should avoid the company of a person who is devoid of devotion, even if such a person is intelligent in worldly activities or learned in the shastras.",
      "gujaratiText": "Koī manuṣhya lokmā vyāvahārik kāryomā buddhivāḷo hoy athavā shāstromā pārangat paṇ hoy, tem chhatā paṇ jo te bhaktie rahit hoy to teno sang na karavo.",
      "sanskritLippy": "Buddhimān api loke syād vyāvahārika-karmasu ।\\nNa sevyo bhakti-hīnash-chech-chhāstra-pārangato’pi vā ॥222॥",
      "audioURL1": "https://baps.box.com/shared/static/nc3yv8118s97kqtvxyco0zq68jevmq9k.mp3",
      "audioURL": "https://baps.box.com/shared/static/h9n293j9mgrj0o7btpbxjle8qj6w63wv.mp3"
    },
    {
      "id": 198,
      "shlokas": "Shloka 223",
      "englishText": "One should not associate with those who ridicule faith in spiritual matters and promote logic alone.",
      "gujaratiText": "Ādhyātmik viṣhayomā shraddhāno ja tiraskār karī je manuṣhya kevaḷ tarkane ja āgaḷ karato hoy teno sang na karavo.",
      "sanskritLippy": "Shraddhām eva tiras kṛutya hyādhyātmikeṣhu kevalam ।\\nPuras-karoti yas-tarkam tat-sangam-ācharen-na hi ॥223॥",
      "audioURL1": "https://baps.box.com/shared/static/pmu9wgyxkwvbd1usyf2uuw3pezk7hagz.mp3",
      "audioURL": "https://baps.box.com/shared/static/amobbjzxt96hxos8o58epkg5twa1jnsq.mp3"
    },
    {
      "id": 199,
      "shlokas": "Shloka 224",
      "englishText": "Mumukshu devotees should also recognize kusang within satsang and should never associate with it.",
      "gujaratiText": "Mumukṣhu haribhaktoe satsangmā rahel kusangne paṇ jāṇavo ane kyārey teno sang na karavo.",
      "sanskritLippy": "Satsange’pi kusango yo gneyah so’pi mumukṣhubhihi ।\\nTat-sangash-cha na kartavyo haribhaktaih kadāchana ॥224॥",
      "audioURL1": "https://baps.box.com/shared/static/zzd4rpb8gtgfp5rrh3gb5n45reaetzle.mp3",
      "audioURL": "https://baps.box.com/shared/static/4naizr5xpd8wwql2rrb5aoixqp2u6hen.mp3"
    },
    {
      "id": 200,
      "shlokas": "Shloka 225",
      "englishText": "One should avoid the company of those who are lax in observing niyams or see human traits in the manifest form of Bhagwan or the guru.",
      "gujaratiText": "Je manuṣhya pratyakṣh Bhagwānmā ane gurumā manuṣhyabhāv joto hoy ane niyam pāḷavāmā shithil hoy teno sang na karavo.",
      "sanskritLippy": "Harau gurau cha pratyakṣhe manuṣhya-bhāva-darshanaha ।\\nShithilo niyame yash-cha na tasya sangam ācharet ॥225॥",
      "audioURL1": "https://baps.box.com/shared/static/2di1sg61xzy2xzwdk098d9seyvkoq1nq.mp3",
      "audioURL": "https://baps.box.com/shared/static/qiyhkm6lu8z6lxyryodlhpcbk5ua7ylt.mp3"
    },
    {
      "id": 201,
      "shlokas": "Shloka 226",
      "englishText": "One should avoid the company of those who perceive drawbacks in devotees, speak only ill of others, are wilful or disobey the guru.",
      "gujaratiText": "Je manuṣhya bhaktomā doṣh jonār, avaguṇnī ja vāto karanār, manasvī ane gurudrohī hoy teno sang na karavo.",
      "sanskritLippy": "Bhakteṣhu doṣha-dṛuṣhṭih syād avaguṇaika-bhāṣhakaha ।\\nManasvī yo guru-drohī na cha tat-sangam ācharet ॥226॥",
      "audioURL1": "https://baps.box.com/shared/static/3nadegl0yzyisnhsdtsuiz0ycsvp7aby.mp3",
      "audioURL": "https://baps.box.com/shared/static/0jvpxhx1j9zh4192jk2xykfdiozg5r1x.mp3"
    },
    {
      "id": 202,
      "shlokas": "Shloka 227",
      "englishText": "One should not associate with those who defame noble works, sacred texts or satsang.",
      "gujaratiText": "Je manuṣhya satkārya, sachchhāstra tathā satsangnī nindā karato hoy teno sang na karavo.",
      "sanskritLippy": "Sat-kārya-nindako yash-cha sach-chhāstra-nindako janaha ।\\nSatsanga-nindako yash-cha tat-sangam ācharen-na hi ॥227॥",
      "audioURL1": "https://baps.box.com/shared/static/bjzlrx4kiv7e0m8akiiz0pq1uhhmy6se.mp3",
      "audioURL": "https://baps.box.com/shared/static/r4nnj5dtzx1ft0i2can9l47vz1utfg8f.mp3"
    },
    {
      "id": 203,
      "shlokas": "Shloka 228",
      "englishText": "One should shun the company of those whose words weaken one’s conviction in Bhagwan, the guru or satsang.",
      "gujaratiText": "Jenī vāto sāmbhaḷavāthī Bhagwān, guru tathā satsangne viṣhe niṣhṭhā ṭaḷatī hoy teno sang tyajavo.",
      "sanskritLippy": "Vachanānām shruter yasya niṣhṭhāyā bhanjanam bhavet ।\\nGurau Harau cha satsange tasya sangam pari-tyajet ॥228॥",
      "audioURL1": "https://baps.box.com/shared/static/9gtpb2nu4la0gwmbwpomr2vrv2t13m3j.mp3",
      "audioURL": "https://baps.box.com/shared/static/e1pu7sqilmvqfmv463bq848gkbpjz42w.mp3"
    },
    {
      "id": 204,
      "shlokas": "Shloka 229",
      "englishText": "One should respectfully associate with a person who has firm devotion and conviction in Akshar-Purushottam and who is discerning.",
      "gujaratiText": "Jene Akṣhar-Puruṣhottamne viṣhe dṛuḍh niṣhṭhā hoy, dṛuḍh bhakti hoy ane je vivekī hoy teno sang ādar thakī karavo.",
      "sanskritLippy": "Bhaved yo dṛaḍha-niṣhṭhāvān Akṣhara-Puruṣhottame ।\\nDṛaḍha-bhaktir-vivekī cha kuryāt tat-sangam ādarāt ॥229॥",
      "audioURL1": "https://baps.box.com/shared/static/d7247ri7c1ky80begawo0ow864en6q0g.mp3",
      "audioURL": "https://baps.box.com/shared/static/bxdhf6xw6oyjs1xtvel2ksb6j3lra2b8.mp3"
    },
    {
      "id": 205,
      "shlokas": "Shloka 230",
      "englishText": "One should respectfully associate with those who do not doubt the words of Bhagwan or the guru, and are trustworthy and wise.",
      "gujaratiText": "Bhagwān tathā gurunā vākyomā jene sanshay na hoy, je vishvāsu hoy, buddhimān hoy teno sang ādar thakī karavo.",
      "sanskritLippy": "Harer-gurosh-cha vākyeṣhu shankā yasya na vidyate ।\\nVishvāsur buddhimān yash-cha kuryāt tat-sangam ādarāt ॥230॥",
      "audioURL1": "https://baps.box.com/shared/static/smpeatl9o4xezb477xovxczomgjcu89m.mp3",
      "audioURL": "https://baps.box.com/shared/static/88aythfm12zrurj8hklasp3x5sshttv6.mp3"
    },
    {
      "id": 206,
      "shlokas": "Shloka 231",
      "englishText": "One should respectfully associate with those who always eagerly follow commands with enthusiasm and determination, and are humble and cooperative.",
      "gujaratiText": "Āgnā pāḷavāmā je sadāy utsāh sāthe tatpar hoy, dṛuḍh hoy; je nirmānī tathā saraḷ hoy teno sang ādar thakī karavo.",
      "sanskritLippy": "Āgnāyāh pālane nityam sotsāham tat-paro dṛaḍhaha ।\\nNirmānaha saralo yash-cha kuryāt tat-sangam ādarāt ॥231॥",
      "audioURL1": "https://baps.box.com/shared/static/q7a9whn2hdsp182chj276ls8nfpek3xz.mp3",
      "audioURL": "https://baps.box.com/shared/static/2r6v1wujtrguq2yd9mlbey6w2kuqxh3y.mp3"
    },
    {
      "id": 207,
      "shlokas": "Shloka 232",
      "englishText": "One should respectfully associate with those who lovingly see divinity in both the divine and human-like actions of Bhagwan and the guru.",
      "gujaratiText": "Bhagwān ane gurunā divya tathā manuṣhya charitromā je sneh-pūrvak divyatānu darshan karato hoy teno sang ādar thakī karavo.",
      "sanskritLippy": "Harer gurosh-charitreṣhu divyeṣhu mānuṣheṣhu yah ।\\nSa-sneham divyatā-darshī kuryāt tat-sangam ādarāt ॥232॥",
      "audioURL1": "https://baps.box.com/shared/static/l1m9zqftd04qmoq2xek3semvzyzwlsgp.mp3",
      "audioURL": "https://baps.box.com/shared/static/bmwiwbaxg6a94nvz44fqpyh7qp943xm2.mp3"
    },
    {
      "id": 208,
      "shlokas": "Shloka 233",
      "englishText": "One should respectfully associate with those in satsang who eagerly imbibe the virtues of others, never speak about others’ flaws and keep suhradbhāv.",
      "gujaratiText": "Satsangmā je manuṣhya anyanā guṇo grahaṇ karavāmā tatpar hoy, durguṇonī vāt na karato hoy, suhṛudbhāvavāḷo hoy teno sang ādar thakī karavo.",
      "sanskritLippy": "Tat-paro’nya-guṇa-grāhe vimukho dur-guṇoktitaha ।\\nSuhṛad-bhāvī cha satsange kuryāt tat-sangam ādarāt ॥233॥",
      "audioURL1": "https://baps.box.com/shared/static/95dcnwxki46v5v4y3sfmkr0z9w6ffkea.mp3",
      "audioURL": "https://baps.box.com/shared/static/jj14tx0dykvk3v7d3vpvlfx5l2o0f142.mp3"
    },
    {
      "id": 209,
      "shlokas": "Shloka 234",
      "englishText": "One should respectfully associate with a person whose conduct and thoughts aim solely to please the guru.",
      "gujaratiText": "Jenā āchār tathā vichārne viṣhe guruharine rājī karavānu ekamātra lakṣhya hoy teno sang ādar thakī karavo.",
      "sanskritLippy": "Lakṣhyam yasyaika-mātram syād Guruhari-prasannatā ।\\nĀchāre’pi vichāre’pi kuryāt tat-sangam ādarāt ॥234॥",
      "audioURL1": "https://baps.box.com/shared/static/otudv4nge7r99zdft10owflj3e1yojv7.mp3",
      "audioURL": "https://baps.box.com/shared/static/iiyhtys2wecflbcyu5hczwpvx31zshxl.mp3"
    },
    {
      "id": 210,
      "shlokas": "Shloka 235",
      "englishText": "One should study and teach the Sanskrit or vernacular texts of one’s Sampraday according to one’s abilities and preferences.",
      "gujaratiText": "Potānī shakti ane ruchi pramāṇe Sanskṛut tathā prākṛut bhāṣhāmā potānā sampradāynā granthonu paṭhan-pāṭhan karavu.",
      "sanskritLippy": "Sva-sampradāya-granthānām yathā-shakti yathā-ruchi ।\\nSanskṛute prākṛute vā’pi kuryāt paṭhana-pāṭhane ॥235॥",
      "audioURL1": "https://baps.box.com/shared/static/mb20ehfkt1hskkzldk7zx3d406nw7bjt.mp3",
      "audioURL": "https://baps.box.com/shared/static/2orxudrlb08wsue3rbskf30w8znltuou.mp3"
    },
    {
      "id": 211,
      "shlokas": "Shloka 236",
      "englishText": "One should daily read the Vachanamrut, Swamini Vato and the jivancharitras of the Gunatit gurus with adoration.",
      "gujaratiText": "Vachanāmṛut, Swāmīnī Vāto tathā guṇātīt guruonā jīvan-charitro nitye bhāvthī vānchavā.",
      "sanskritLippy": "Swāmi-vārtāhā paṭhen-nityam tathaiva Vachanāmṛutam ।\\nGuṇātīta-gurūṇām cha charitam bhāvatah paṭhet ॥236 ॥",
      "audioURL1": "https://baps.box.com/shared/static/tbauy3xtsn8kp6xqg8cypxm4m2hsc3od.mp3",
      "audioURL": "https://baps.box.com/shared/static/g6jmpmip68jortngasoe9fxkv3mf35ei.mp3"
    },
    {
      "id": 212,
      "shlokas": "Shloka 237-238",
      "englishText": "The teachings and actions of Swaminarayan Bhagwan and the Gunatit gurus are the very life of satsangis. Therefore, satsangis should, with a calm mind, listen to, contemplate on and repeatedly recall them daily with mahimā, faith and devotion.",
      "gujaratiText": "Swāminārāyaṇ Bhagwān tathā guṇātīt guruonā updesho ane charitro satsangīonu jīvan chhe. Tethī satsangīe tenu shānt chitte shravaṇ, manan tathā nididhyāsan mahimāe sahit, shraddhā-pūrvak tathā bhaktithī roj karavu.",
      "sanskritLippy": "Upadeshāsh-charitrāṇi Swāminārāyaṇa-Prabhoho ।\\nGuṇātīta-gurūṇām cha satsanginām hi jīvanam ॥237॥\\nAtas-tach-chhravaṇam kuryād mananam nidi-dhyāsanam ।\\nMahimnā shraddhayā bhaktyā pratyaham shānta-chetasā ॥238॥",
      "audioURL1": "https://baps.box.com/shared/static/bmcl6hlad8xll0hl6dj62lc5r6yy7ifq.mp3",
      "audioURL": "https://baps.box.com/shared/static/6u1sbcfzgj0vg9rwqwrnjqw88xg8srxq.mp3"
    },
    {
      "id": 213,
      "shlokas": "Shloka 239",
      "englishText": "One should not read, listen to or believe words that go against the Sampraday’s principles or raise doubts.",
      "gujaratiText": "Sampradāynā siddhāntomā bādh kare tathā sanshay utpanna kare tevā vachano vānchavā, sāmbhaḷavā ke mānavā nahī.",
      "sanskritLippy": "Sāmpradāyika-siddhānta-bādhakaram hi yad vachaha ।\\nPaṭhyam shravyam na mantavyam sanshayotpādakam cha yat ॥239॥",
      "audioURL1": "https://baps.box.com/shared/static/np7bbt6j8ex2oszak56nr0kj6j06w9p9.mp3",
      "audioURL": "https://baps.box.com/shared/static/kmmuv9te5b5obedfxn0axtqc8m8ulbql.mp3"
    },
    {
      "id": 214,
      "shlokas": "Shloka 240",
      "englishText": "To reinforce profound devotion towards Swaminarayan Bhagwan in one’s heart, one should observe vows during chāturmās according to the guru’s instructions.",
      "gujaratiText": "Swāminārāyaṇ Bhagwānne viṣhe hṛudaymā parā-bhakti dṛuḍh karavā guruharinā ādeshthī Chāturmāsmā vrat karavu.",
      "sanskritLippy": "Swāminārāyaṇe bhaktim parām dṛaḍhayitum hṛadi ।\\nGuruhareh samādeshāch chāturmāsye vratam charet ॥240॥",
      "audioURL1": "https://baps.box.com/shared/static/tqgwsgskvsmp93oeb7k408e2coqg560q.mp3",
      "audioURL": "https://baps.box.com/shared/static/tvuoqu6xc7157k5anwecdw2948miy8zx.mp3"
    },
    {
      "id": 215,
      "shlokas": "Shloka 241-242",
      "englishText": "This includes observing chāndrāyan and other fasts, as well as chanting the [Swaminarayan] mantra, performing pradakshinās, listening to spiritual discourses, offering extra dandvat pranāms, and additional devotion with faith, love and the wish to please Bhagwan.",
      "gujaratiText": "Temā chāndrāyaṇ, upavās vagere tathā mantra-jap, pradakṣhiṇā, kathā-shravaṇ, adhik danḍavat praṇām karavā ityādirūpe shraddhāe karīne, prīti-pūrvak ane Bhagwānno rājīpo prāpt karavā visheṣh bhaktinu ācharaṇ karavu.",
      "sanskritLippy": "Chāndrāyaṇopavāsādir mantra-japah pradakṣhiṇāhā ।\\nKathā-shrutir-daṇḍavach-cha praṇāmā adhikās-tadā ॥241॥\\nItyevam ādirūpeṇa shraddhayā prīti-pūrvakam ।\\nHari-prasannatām prāptum visheṣhām bhaktim ācharet ॥242॥",
      "audioURL1": "https://baps.box.com/shared/static/phhethwwy9sw9j2hyz7dgu9dempeo9ok.mp3",
      "audioURL": "https://baps.box.com/shared/static/ii9k7cv87aado1aukz8ogliyi5b0gt6k.mp3"
    },
    {
      "id": 216,
      "shlokas": "Shloka 243",
      "englishText": "During this time, one should also regularly read and teach the Sampraday’s shastras according to one’s preference and ability.",
      "gujaratiText": "Tyāre potānī ruchi tathā shakti pramāṇe sampradāynā shāstronu niyam-pūrvak paṭhan-pāṭhan karavu.",
      "sanskritLippy": "Sampradāyasya shāstrāṇām paṭhanam pāṭhanam tadā ।\\nYathā-ruchi yathā-shakti kuryād niyama-pūrvakam ॥243॥",
      "audioURL1": "https://baps.box.com/shared/static/bz7i18hytlzdvu7jmkahlce5yyz1qexm.mp3",
      "audioURL": "https://baps.box.com/shared/static/jw8l082qd0maht1lkyc109nwdxnviq7e.mp3"
    },
    {
      "id": 217,
      "shlokas": "Shloka 244",
      "englishText": "To increase one’s love for Bhagwan, all satsangis should celebrate festivals with great joy and devotion.",
      "gujaratiText": "Bhagwānne viṣhe prīti vadhāravā sāru sarve satsangīoe harṣh ane ullāsthī bhaktibhāve utsavo karavā.",
      "sanskritLippy": "Sarvaih satsangibhih kāryāh prītim vardhayitum Harau ।\\nUtsavā bhakti-bhāvena harṣheṇollāsatas-tathā ॥244॥",
      "audioURL1": "https://baps.box.com/shared/static/53bqod9y2rk8gi8phjpkfhdgpdwqmywu.mp3",
      "audioURL": "https://baps.box.com/shared/static/er1mz6j2fr80m3y45c54lw6n5zvb2qm1.mp3"
    },
    {
      "id": 218,
      "shlokas": "Shloka 245",
      "englishText": "The birth festivals of Bhagwan Swaminarayan and the Aksharbrahman gurus should always be celebrated with devotion",
      "gujaratiText": "Bhagwān Swāminārāyaṇ tathā Akṣharbrahma guruonā janma-mahotsavo bhakti-bhāvthī hammeshā ujavavā.",
      "sanskritLippy": "Janma-mahotsavā nityam Swāminārāyaṇa-Prabhoho ।\\nBrahmā’kṣhara-gurūṇām cha kartavyā bhakti-bhāvataha ॥245॥",
      "audioURL1": "https://baps.box.com/shared/static/s00xp7vphg5nenp6e8o0zb2y4ol19rh9.mp3",
      "audioURL": "https://baps.box.com/shared/static/a6i7viv9koau4vp06j8k9o6mo20i8s0m.mp3"
    },
    {
      "id": 219,
      "shlokas": "Shloka 246",
      "englishText": "According to their means, satsangis should celebrate festivals to commemorate the special days related to Shri Hari and the gurus.",
      "gujaratiText": "Satsangī janoe Shrīhari tathā gurunā vishiṣhṭa prasangone divase yathā-shakti parvotsavo karavā.",
      "sanskritLippy": "Harer guror vishiṣhṭānām prasangānām dineṣhu cha ।\\nSatsangibhir yathā-shakti kāryāh parvotsavā janaihi ॥246॥",
      "audioURL1": "https://baps.box.com/shared/static/3kuv4cn39tcyppsxm1lyszg4oxo8x03e.mp3",
      "audioURL": "https://baps.box.com/shared/static/2kpj8ekhphj7cmzg9zt2ku6aq1q0u1in.mp3"
    },
    {
      "id": 220,
      "shlokas": "Shloka 247",
      "englishText": "During festivals, satsangis should devoutly sing kirtans to the accompaniment of instruments and especially discourse on the glory [of God and guru].",
      "gujaratiText": "Parvotsavone viṣhe bhaktie karīne savādya kīrtan karavu ane visheṣh karīne mahimānī vāto karavī.",
      "sanskritLippy": "Sa-vādyam kīrtanam kāryam parvotsaveṣhu bhaktitaha ।\\nMahimnash-cha kathā-vārtā karaṇīyā visheṣhataha ॥247॥",
      "audioURL1": "https://baps.box.com/shared/static/new1ikcxy2buv9xjuxmlws2twh4wd62t.mp3",
      "audioURL": "https://baps.box.com/shared/static/c9wjot6akmp07aqoiean346nsczlkwac.mp3"
    },
    {
      "id": 221,
      "shlokas": "Shloka 248",
      "englishText": "On the day of Chaitra sud 9, one should offer pujan to Ramchandra Bhagwan. On the day of Shravan vad 8, one should offer pujan to Krishna Bhagwan.",
      "gujaratiText": "Chaitra sud nomne divase Rāmchandra Bhagwānnu pūjan karavu. Shrāvaṇ vad āṭhamne divase Kṛuṣhṇa Bhagwānnu pūjan karavu.",
      "sanskritLippy": "Chaitra-shukla-navamyām hi kāryam Shrī-Rāma-pūjanam ।\\nKṛiṣhṇā’ṣhṭamyām tu kartavyam Shrāvaṇe Kṛiṣhṇa-pūjanam ॥248॥",
      "audioURL1": "https://baps.box.com/shared/static/e2ab5n8dxyv5atl4q6d4e0gqpxf72okv.mp3",
      "audioURL": "https://baps.box.com/shared/static/bit8i9x2irx73j0asyvy0ldhif91d2ej.mp3"
    },
    {
      "id": 222,
      "shlokas": "Shloka 249",
      "englishText": "On Shivratri, one should offer pujan to Shankar Bhagwan. On Bhadarva sud 4, one should offer pujan to Ganpati.",
      "gujaratiText": "Shiva-rātrine viṣhe Shankar Bhagwānnu pūjan karavu. Bhādarvā sud chothne divase Gaṇpatinu pūjan karavu.",
      "sanskritLippy": "Shiva-rātrau hi kartavyam pūjanam Shankarasya cha ।\\nGaṇesham Bhādra-shuklāyām chaturthyām pūjayet tathā ॥249॥",
      "audioURL1": "https://baps.box.com/shared/static/pwiln2endxly5mnep2s9sxt7f5qyta3v.mp3",
      "audioURL": "https://baps.box.com/shared/static/xoee1xnhckad30zfi48i3rhcoeg9wpz1.mp3"
    },
    {
      "id": 223,
      "shlokas": "Shloka 250",
      "englishText": "On Aso vad 14, one should offer pujan to Hanumanji. One should devoutly bow to the deities of any mandir that one comes across.",
      "gujaratiText": "Āso vad chaudashne divas Hanumānjīnu pūjan karavu. Mārge jatā koī mandir āve to te devne bhāvthī praṇām karavā.",
      "sanskritLippy": "Mārutim Āshvine kṛuṣhṇa-chaturdashyām hi pūjayet ।\\nMārge mandira-samprāptau tad-devam praṇamed hṛadā ॥250॥",
      "audioURL1": "https://baps.box.com/shared/static/6odeer5tfroq618d243afh6r9mafcvav.mp3",
      "audioURL": "https://baps.box.com/shared/static/lve10fxbeikk8pj2zf2l20hqjbhhg1cn.mp3"
    },
    {
      "id": 224,
      "shlokas": "Shloka 251",
      "englishText": "Vishnu, Shankar, Parvati, Ganpati and Surya – these five deities should be revered.",
      "gujaratiText": "Viṣhṇu, Shankar, Pārvatī, Gaṇpati tathā Sūrya e pānch devatā pūjyapaṇe mānavā.",
      "sanskritLippy": "Viṣhṇush-cha Shankarash-chaiva Pārvatī cha Gajānanaha ।\\nDina-karash-cha panchaitā mānyāh pūjyā hi devatāhā ॥251॥",
      "audioURL1": "https://baps.box.com/shared/static/ua99ax1fy4aipcxnosmxuu7nb01h4j9l.mp3",
      "audioURL": "https://baps.box.com/shared/static/sv6gj3xoi519tj7pzlmbj46dx4kihf88.mp3"
    },
    {
      "id": 225,
      "shlokas": "Shloka 252",
      "englishText": "One should have firm conviction in Akshar-Purushottam Ma- haraj. However, one should not disrespect any other deity.",
      "gujaratiText": "Akṣhar-Puruṣhottam Mahārājne viṣhe dṛuḍh niṣhṭhā rākhavī. Tem chhatā koī paṇ anya devonī nindā na karavī.",
      "sanskritLippy": "Pari-rakṣhed dṛaḍhām niṣhṭhām Akṣhara-Puruṣhottame ।\\nTathā’pi naiva kartavyam devatā’ntara-nindanam ॥252॥",
      "audioURL1": "https://baps.box.com/shared/static/n4a72g84s6h1hyqgvlb9qjmkgvkmeggx.mp3",
      "audioURL": "https://baps.box.com/shared/static/aw8uq505s5uv9nknvp2tre0n63webeym.mp3"
    },
    {
      "id": 226,
      "shlokas": "Shloka 253",
      "englishText": "One should not have contempt for other religions, sampradāys or their followers. One should never criticize them and should always treat them with respect.",
      "gujaratiText": "Anya dharmo, sampradāyo ke temanā anuyāyīone viṣhe dveṣh na karavo. Temanī nindā na karavī. Temane sadā ādar āpavo.",
      "sanskritLippy": "Dharmā vā sampradāyā vā ye’nye tad-anuyāyinaha ।\\nNa te dveṣhyā na te nindyā ādartavyāsh-cha sarvadā ॥253॥",
      "audioURL1": "https://baps.box.com/shared/static/kwn90azce4fv0vf5r3gwo8d1wqpv0gil.mp3",
      "audioURL": "https://baps.box.com/shared/static/a2pwtc3hqkqnnjbj9p4babi3etx9kfpz.mp3"
    },
    {
      "id": 227,
      "shlokas": "Shloka 254",
      "englishText": "One should never disrespect mandirs, shastras or sadhus. One should honour them appropriately according to one’s capacity.",
      "gujaratiText": "Mandiro, shāstro ane santonī kyārey nindā na karavī. Potānī shakti pramāṇe temano yathochit satkār karavo.",
      "sanskritLippy": "Mandirāṇi cha shāstrāṇi santas-tathā kadāchana ।\\nNa nindyāste hi satkāryā yathā-shakti yathochitam ॥254॥",
      "audioURL1": "https://baps.box.com/shared/static/a8buh0q7k9b8axlte2x1khtqzmx5sh42.mp3",
      "audioURL": "https://baps.box.com/shared/static/1q4nldq0vzrubuep6m2nbbxw5bqspz6t.mp3"
    },
    {
      "id": 228,
      "shlokas": "Shloka 255",
      "englishText": "Whichever acts of self-control, fasts and other austerities are undertaken, they should be performed only as bhakti and with the intent to solely please Bhagwan.",
      "gujaratiText": "Sanyam, upavās ityādi je je tapnu ācharaṇ karavu te to kevaḷ Bhagwānne rājī karavā tathā bhakti māṭe ja karavu.",
      "sanskritLippy": "Sanyam-anopavāsādi yad-yat-tapah samācharet ।\\nPrasādāya Hares-tat tu bhaktyartham eva kevalam ॥255॥",
      "audioURL1": "https://baps.box.com/shared/static/7ukomsum1xdxj8y434sghvs0vp8aryne.mp3",
      "audioURL": "https://baps.box.com/shared/static/dk9b7b526supzqjcl4oo3gcqmh8i3qqp.mp3"
    },
    {
      "id": 229,
      "shlokas": "Shloka 256",
      "englishText": "One should always observe the ekādashi fast with utmost reverence. On this day, prohibited items should never be consumed.",
      "gujaratiText": "Ekādashīnu vrat sadāy param ādar thakī karavu. Te divase niṣhiddha vastu kyārey na jamavī.",
      "sanskritLippy": "Ekādashyā vratam nityam kartavyam param-ādarāt ।\\nTad-dine naiva bhoktavyam niṣhiddham vastu karhichit ॥256॥",
      "audioURL1": "https://baps.box.com/shared/static/cfg1csj9jcbaqplt66a1gur3jwbnigw4.mp3",
      "audioURL": "https://baps.box.com/shared/static/igkft2gwolpddbbww1w35l0gt1sjtbov.mp3"
    },
    {
      "id": 230,
      "shlokas": "Shloka 257",
      "englishText": "While fasting, one should endeavour to give up sleep during daytime. Sleeping during daytime destroys the merits earned by the austerity of fasting.",
      "gujaratiText": "Upavāsne viṣhe divasnī nidrāno prayatna-pūrvak tyāg karavo. Divase līdhelī nidrāthī upavāsrūpī tap nāsh pāme chhe.",
      "sanskritLippy": "Upavāse divā-nidrām prayatnatah pari-tyajet ।\\nDivasa-nidrayā nashyed upavāsātmakam tapaha ॥257॥",
      "audioURL1": "https://baps.box.com/shared/static/d6jbor4dt6x4ec72en5e5i7uayc5l1el.mp3",
      "audioURL": "https://baps.box.com/shared/static/o05csv1ptzk2dc91nhhpmxfqea4dl17a.mp3"
    },
    {
      "id": 231,
      "shlokas": "Shloka 258-259",
      "englishText": "If one desires to go on a pilgrimage to the places sanctified by Bhagwan Swaminarayan or the Aksharbrahman gurus, one should do so according to one’s means and preferences.",
      "gujaratiText": "Bhagwān Swāminārāyaṇe pote je sthānone prasādībhūt karyā chhe, Akṣharbrahma-swarūp guruoe je sthānone prasādībhūt karyā chhe, te sthānonī yātrā karavānī ichchhā hoy teṇe potānī shakti ane ruchi pramāṇe karavī.",
      "sanskritLippy": "Swāminārāyaṇeneha swayam yaddhi prasāditam ।\\nGurubhish-chā’kṣhara-Brahma-swarūpair yat prasāditam ॥258॥\\nTeṣhām sthāna-visheṣhāṇām yātrām kartum ya ichchhati ।\\nTad yātrām sa janah kuryād yathā-shakti yathā-ruchi ॥259॥",
      "audioURL1": "https://baps.box.com/shared/static/myprz8mrai6iixtr0btf8ekisdveo1iw.mp3",
      "audioURL": "https://baps.box.com/shared/static/ni7oubtywpocqv9bg1xcocig8jmhij96.mp3"
    },
    {
      "id": 232,
      "shlokas": "Shloka 260",
      "englishText": "One may go on a pilgrimage to Ayodhya, Mathura, Kashi, Kedarnath, Badrinath, Rameshwar and other sacred places according to one’s means and preferences.",
      "gujaratiText": "Ayodhyā, Mathurā, Kāshī, Kedārnāth, Badrīnāth tathā Rāmeshvar ityādi tīrthonī yātrāe potānī shakti ane ruchi pramāṇe javu.",
      "sanskritLippy": "Ayodhyām Mathurām Kāshīm Kedāram Badarīm vrajet ।\\nRāmeshvarādi tīrtham cha yathā-shakti yathā-ruchi ॥260॥",
      "audioURL1": "https://baps.box.com/shared/static/d5fbb7os0dnjghfpl7yef3e7269uqcjy.mp3",
      "audioURL": "https://baps.box.com/shared/static/c8ig7wb4sy4ur0ltk8zidhliqxdijwgk.mp3"
    },
    {
      "id": 233,
      "shlokas": "Shloka 261",
      "englishText": "After arriving at the mandir, all should certainly follow its disciplines. Males should not touch females and females should not touch males.",
      "gujaratiText": "Mandirmā āvel sau koīe maryādānu pālan avashya karavu. Mandirne viṣhe āvel puruṣhoe strīno sparsh na karavo tathā strīoe puruṣhno sparsh na karavo.",
      "sanskritLippy": "Maryādā pālanīyaiva sarvair mandiram āgataihi ।\\nNāryo naiva naraih spṛushyā nārībhish-cha narās-tathā ॥261॥",
      "audioURL1": "https://baps.box.com/shared/static/7ekap3d1v6r11q1n37yy8veytvl7inyl.mp3",
      "audioURL": "https://baps.box.com/shared/static/1krhr9lyyj9jaiuqhy4q0wts42tz97d5.mp3"
    },
    {
      "id": 234,
      "shlokas": "Shloka 262",
      "englishText": "At the mandir, males and females should always dress according to the norms of satsang.",
      "gujaratiText": "Strīo tathā puruṣhoe hammeshā satsangnā niyam anusār mandirne viṣhe vastro paheravā.",
      "sanskritLippy": "Niyamam anusṛutyaiva satsangasya tu mandire ।\\nVastrāṇi pari-dheyāni strībhih pumbhish-cha sarvadā ॥262॥",
      "audioURL1": "https://baps.box.com/shared/static/sknvurltpu7kdv95aqglspfx49s12fn7.mp3",
      "audioURL": "https://baps.box.com/shared/static/zl1rewv405q4dcdfvi3m6qeol0be1ehd.mp3"
    },
    {
      "id": 235,
      "shlokas": "Shloka 263",
      "englishText": "A devotee should never go empty-handed for the darshan of Bhagwan or the guru.",
      "gujaratiText": "Bhaktajane Bhagwān ke gurunā darshane kyārey khālī hāthe na javu.",
      "sanskritLippy": "Gachchhed yadā darshanārtham bhakta-jano Harer guroho ।\\nRiktena pāṇinā naiva gachchhet tadā kadāchana ॥263॥",
      "audioURL1": "https://baps.box.com/shared/static/9uchm0670lc5qqp5fbhc59wwwu615ggn.mp3",
      "audioURL": "https://baps.box.com/shared/static/ffxe09nroft8iitf613ftpgyzjzf6lbi.mp3"
    },
    {
      "id": 236,
      "shlokas": "Shloka 264-265",
      "englishText": "During a solar or lunar eclipse, all satsangis should discontinue all activities and en gage in Bhagwan’s bhajan. During that time, one should not sleep or eat, but sit in one place to sing kirtans dedicated to Bhagwan and undertake other forms of devotion until the eclipse is over.",
      "gujaratiText": "Sarve satsangīoe sūrya ke chandranā grahaṇ kāḷe sarva kriyāono tyāg karī Bhagwānnu bhajan karavu. Te samaye nidrā tathā bhojanno tyāg karīne ek sthaḷe besīne grahaṇ pūrṇa thāy tyā sudhī bhagwat-kīrtanādi karavu.",
      "sanskritLippy": "Āditya-chandrayor grāha-kāle satsangibhih samaihi ।\\nPari-tyajya kriyāhā sarvāh kartavyam bhajanam Harehe ॥264॥\\nNidrām cha bhojanam tyaktvā tadaikatropavishya cha ।\\nKartavyam grāha-muktyantam Bhagavat-kīrtanādikam ॥265॥",
      "audioURL1": "https://baps.box.com/shared/static/ao1nm5hklffedw0ckoe40dyovicl49v0.mp3",
      "audioURL": "https://baps.box.com/shared/static/aqu02u8nnp3xckul5v5vnq6jjyq1aoa2.mp3"
    },
    {
      "id": 237,
      "shlokas": "Shloka 266",
      "englishText": "When the eclipse is over, all should bathe and soak the clothes they are wearing. Thereafter, renunciants should perform puja and householder devotees should give donations.",
      "gujaratiText": "Grahaṇnī mukti thaye sarva janoe savastra snān karavu. Tyāgīoe Bhagwānnī pūjā karavī ane gṛuhasthoe dān karavu.",
      "sanskritLippy": "Grāha-muktau sa-vastram hi kāryam snānam samair janaihi ।\\nTyāgibhish-cha Harihi pūjyo deyam dānam gṛuhasthitaihi ॥266॥",
      "audioURL1": "https://baps.box.com/shared/static/wk84ijmdzpuajg5llreagbvfdru5qx1u.mp3",
      "audioURL": "https://baps.box.com/shared/static/g4ul90ojzd5pnhdu1asr7tqgecgxcvl4.mp3"
    },
    {
      "id": 238,
      "shlokas": "Shloka 267",
      "englishText": "One should perform rituals related to birth, death and shrāddh according to the Satsang tradition.",
      "gujaratiText": "Janma-maraṇnī sūtak tathā shrāddha vagere vidhio satsangnī rītne anusarī pāḷavī.",
      "sanskritLippy": "Janmano maraṇasyā’pi vidhayah sūtakādayaha ।\\nSatsanga-rītim-āshritya pālyāh shrāddhā-dayas-tathā ॥267॥",
      "audioURL1": "https://baps.box.com/shared/static/ikgow5jsx1zfx1losild6wknwnlqwc6t.mp3",
      "audioURL": "https://baps.box.com/shared/static/kiyoue4k0tyxvaxu8s0f68y8ec3v7rg6.mp3"
    },
    {
      "id": 239,
      "shlokas": "Shloka 268",
      "englishText": "If one has acted immorally, one should piously atone to please Bhagwan.",
      "gujaratiText": "Koī ayogya ācharaṇ thaī jāy tyāre Bhagwānne rājī karavā shuddha bhāve prāyashchitta karavu.",
      "sanskritLippy": "Prāyash-chittam anuṣhṭheyam jāte tvayogya-vartane ।\\nParamātma-prasādārtham shuddhena bhāvatas-tadā ॥268॥",
      "audioURL1": "https://baps.box.com/shared/static/rxdrgq2luo2ck2z0eab9zxket5wdm1f8.mp3",
      "audioURL": "https://baps.box.com/shared/static/ztydxjdxmlvvdi4ee0z78z1bdwjzediv.mp3"
    },
    {
      "id": 240,
      "shlokas": "Shloka 269",
      "englishText": "One should follow the rules described for emergencies only in times of crisis. Do not give up one’s dharma by considering minor difficulties to be major.",
      "gujaratiText": "Āpatkāḷmā ja āpaddharma ācharavo. Alp āpattine moṭī āpatti mānī laī dharmano tyāg na karavo.",
      "sanskritLippy": "Āpat-kāle tu satyeva hyāpado dharmam ācharet ।\\nAlpāpattim mahāpattim matvā dharmam na san-tyajet ॥269॥",
      "audioURL1": "https://baps.box.com/shared/static/rxwf60s161gvoas0ojqv11k4yug579az.mp3",
      "audioURL": "https://baps.box.com/shared/static/0014lzgvwi4gdakvj4hundhzyl47pk35.mp3"
    },
    {
      "id": 241,
      "shlokas": "Shloka 270",
      "englishText": "When agonizing calamities arise, one should derive strength from Bhagwan and act to protect oneself and others.",
      "gujaratiText": "Kaṣhṭ āpe tevī āpatti āvī paḍe tyāre Bhagwānnu baḷ rākhī je rīte potānī tathā anyanī rakṣhā thāy tem karavu.",
      "sanskritLippy": "Āpattau kaṣhṭa-dāyām tu rakṣhā svasya parasya cha ।\\nYathaiva syāt tathā kāryam rakṣhatā Bhagavad-balam ॥270॥",
      "audioURL1": "https://baps.box.com/shared/static/9w8mbqn39g2pqazenq0fvainh421oe8g.mp3",
      "audioURL": "https://baps.box.com/shared/static/lfrii8u90geag08kd1ttcukvx4d4hffy.mp3"
    },
    {
      "id": 242,
      "shlokas": "Shloka 271",
      "englishText": "When faced with circumstances that may result in death, one who is wise should act according to the guru’s teachings to protect one’s life and live peacefully.",
      "gujaratiText": "Vivekī manuṣhye prāṇno nāsh thāy tevī āpatti āvī paḍe tyāre gurunā ādeshone anusarīne prāṇnī rakṣhā karavī ane sukhe rahevu.",
      "sanskritLippy": "Āpattau prāṇa-nāshinyām prāptāyām tu vivekinā ।\\nGurvādeshā’nusāreṇa prāṇān rakṣhet sukham vaset ॥271॥",
      "audioURL1": "https://baps.box.com/shared/static/dssz8hvlhpjskgic28bsvzh7zx969v7x.mp3",
      "audioURL": "https://baps.box.com/shared/static/26i4dokzyz84rf3ghjgu615qcynxxq4m.mp3"
    },
    {
      "id": 243,
      "shlokas": "Shloka 272-273",
      "englishText": "As per their prevailing location, time, age and abilities, all satsangis should genuinely act, atone and engage in dealings according to the traditions of the Satsang and the guru’s instructions.",
      "gujaratiText": "Sarve satsangī janoe satsangnī rīt pramāṇe, gurunā ādesh anusār, parishuddha bhāvthī desh, kāḷ, avasthā tathā potānī shakti pramāṇe āchār, vyavahār ane prāyashchit karavā.",
      "sanskritLippy": "Satsanga-rītim-āshritya gurvādeshā’nusārataha ।\\nPari-shuddhena bhāvena sarvaih satsangibhir janaihi ॥272॥\\nDesham kālam avasthām cha sva-shaktim anusṛutya cha ।\\nĀchāro vyavahārash-cha prāyash-chittam vidhīyatām ॥273॥",
      "audioURL1": "https://baps.box.com/shared/static/l1jk0ftht3172qsvjf7n77odfm4tin39.mp3",
      "audioURL": "https://baps.box.com/shared/static/e8zxbh8nreddas8rkj04lfw5wnxet893.mp3"
    },
    {
      "id": 244,
      "shlokas": "Shloka 274",
      "englishText": "Observing dharma and niyams elevates the quality of one’s life and also inspires others to live righteously.",
      "gujaratiText": "Dharma-niyam pāḷavāthī jīvan unnat thāy chhe ane anyane paṇ sadāchār pāḷavānī preraṇā maḷe chhe.",
      "sanskritLippy": "Jīvanam unnatim yāti dharma-niyama-pālanāt ।\\nAnyashchā’pi sadāchāra-pālane prerito bhavet ॥274॥",
      "audioURL1": "https://baps.box.com/shared/static/6tgq7si47kcymlfskg9zb4f1fp9bkd9s.mp3",
      "audioURL": "https://baps.box.com/shared/static/jggkpmawhmr7bmng2y9e6s1fdhlea1t9.mp3"
    },
    {
      "id": 245,
      "shlokas": "Shloka 275",
      "englishText": "Devotees of Bhagwan should never fear evil spirits, such as bhuts, prets or pishāchas. They should give up such apprehensions and live happily.",
      "gujaratiText": "Bhagwānnā bhakte kyārey bhūt, pret, pishāch ādinī bīk na rākhavī. Āvī āshankāono tyāg karīne sukhe rahevu.",
      "sanskritLippy": "Bhūta-preta-pishāchāder bhayam kadāpi nā’pnuyāt ।\\nĪdṛuk shankāh pari-tyajya haribhaktah sukham vaset ॥275॥",
      "audioURL1": "https://baps.box.com/shared/static/5ey6n0ed7wm1mwald1ug2ltwul7a7oov.mp3",
      "audioURL": "https://baps.box.com/shared/static/legtppvwa5jhev6oj7qvcokcwdwoq2en.mp3"
    },
    {
      "id": 246,
      "shlokas": "Shloka 276",
      "englishText": "On auspicious and inauspicious occasions, one should recite the sacred ‘Sahajanand Namavali’ while understanding its glory.",
      "gujaratiText": "Shubh tathā ashubh prasangone viṣhe mahimāe sahit pavitra Sahajānand Nāmāvalīno pāṭh karavo.",
      "sanskritLippy": "Shubhā’shubha-prasangeṣhu mahima-sahitam janaha ।\\nPavitrām Sahajānanda-Nāmāvalim paṭhet tathā ॥276॥",
      "audioURL1": "https://baps.box.com/shared/static/w3ikqjyrsrpokbwlc7tiblh0jqcvvd9k.mp3",
      "audioURL": "https://baps.box.com/shared/static/sufqtp6f7yml6q043uvpm4fjk7fxvec4.mp3"
    },
    {
      "id": 247,
      "shlokas": "Shloka 277",
      "englishText": "Kāl, karma and māyā can never harm those who have taken refuge in satsang.",
      "gujaratiText": "Jeone satsangno āshray thayo chhe temanu kāḷ, karma ke māyā kyārey aniṣhṭ karavā samarth thatā ja nathī.",
      "sanskritLippy": "Kālo vā karma vā māyā prabhaven-naiva karhichit ।\\nAniṣhṭa-karaṇe nūnam satsangā’shraya-shālinām ॥277॥",
      "audioURL1": "https://baps.box.com/shared/static/v6e3ndcygpu5x79k468h0kac8yvek108.mp3",
      "audioURL": "https://baps.box.com/shared/static/1lw6cq70ckjramqtxcy9j9cic8g0y96f.mp3"
    },
    {
      "id": 248,
      "shlokas": "Shloka 278",
      "englishText": "Satsangis should always renounce inappropriate indulgence in the sense pleasures, addictions and superstitions.",
      "gujaratiText": "Satsangīoe ayogya viṣhayo, vyasano tathā vahemno sadāy tyāg karavo.",
      "sanskritLippy": "Ayogya-viṣhayāsh-chaivam ayogya-vyasanāni cha ।\\nĀshankāh sampari-tyājyāh satsangam āshritaih sadā ॥278॥",
      "audioURL1": "https://baps.box.com/shared/static/8gvo7j04pti2fbzkaum280bczg929yno.mp3",
      "audioURL": "https://baps.box.com/shared/static/243x5bjgfzjpobdea8pdph38bc7sm5xz.mp3"
    },
    {
      "id": 249,
      "shlokas": "Shloka 279",
      "englishText": "Do not believe kāl, karma and other factors to be the doers. One should realize Akshar-Purushottam Maharaj as the all-doer.",
      "gujaratiText": "Kāḷ, karma ādinu kartāpaṇu na mānavu. Akṣhar-Puruṣhottam Mahārājne sarva-kartā mānavā.",
      "sanskritLippy": "Naiva manyeta kartṛutvam kāla-karmādikasya tu ।\\nManyeta sarva-kartāram Akṣhara-Puruṣhottamam ॥279॥",
      "audioURL1": "https://baps.box.com/shared/static/2myg3b5a7oke3kuboc3rl260y1qeh2n0.mp3",
      "audioURL": "https://baps.box.com/shared/static/3ahhnm18fp7cufi89gwj4yvfmwsbsyac.mp3"
    },
    {
      "id": 250,
      "shlokas": "Shloka 280",
      "englishText": "In difficult times, one should remain patient, offer prayers, persevere and keep firm faith in Akshar-Purushottam Maharaj.",
      "gujaratiText": "Vipatti āve tyāre dhīraj rākhavī, prārthanā karavī, prayatna karavo ane Akṣhar-Puruṣhottam Mahārājne viṣhe dṛuḍh vishvās rākhavo.",
      "sanskritLippy": "Vipattiṣhu dhared dhairyam prārthanam yatnam ācharet ।\\nBhajeta dṛaḍha-vishvāsam Akṣhara-Puruṣhottame ॥280॥",
      "audioURL1": "https://baps.box.com/shared/static/5z9kgox04keft5i6flnrwtq7udtmuffa.mp3",
      "audioURL": "https://baps.box.com/shared/static/m5eegdv1iq55nhst8v09lyg3qstfokbm.mp3"
    },
    {
      "id": 251,
      "shlokas": "Shloka 281",
      "englishText": "Those who wish to join the sadhu ashram should receive initiation from the Aksharbrahman guru. All sadhus should always observe eight-fold brahmacharya.",
      "gujaratiText": "Tyāgāshram grahaṇ karavānī ichchhā hoy temaṇe Akṣharbrahma-swarūp guru pāse dīkṣhā grahaṇ karavī. Sarve tyāgīoe sadā aṣhṭa-prakāre brahmacharya pāḷavu.",
      "sanskritLippy": "Tyāgā’shramechchhunā dīkṣhā grāhyā Brahmā’kṣharād guroho ।\\nBrahma-charyam sadā sarvaih pālyam tyāgibhir aṣhṭadhā ॥281॥",
      "audioURL1": "https://baps.box.com/shared/static/t0webwnzqrwkxcggokzlcyeoowchgxht.mp3",
      "audioURL": "https://baps.box.com/shared/static/9aa80xxapkuj4q0t4k7d2viwrmp22do2.mp3"
    },
    {
      "id": 252,
      "shlokas": "Shloka 282",
      "englishText": "Renunciants should renounce money and should not keep it as their own. They should not even touch money.",
      "gujaratiText": "Tyāgīoe dhanno tyāg karavo ane potānu karīne rākhavu nahī. Dhanno sparsh paṇ na ja karavo.",
      "sanskritLippy": "Dhanam tu tyāgibhis-tyājyam rakṣhyam svīyatayā na cha ।\\nSpṛushyam naivā’pi vittam cha tyāgibhis-tu kadāchana ॥282॥",
      "audioURL1": "https://baps.box.com/shared/static/7r7qczetrcgcqmjxarxe39de2yqpwktp.mp3",
      "audioURL": "https://baps.box.com/shared/static/crc5cwnfa5lrk1qze7tciilervimoyzb.mp3"
    },
    {
      "id": 253,
      "shlokas": "Shloka 283-284",
      "englishText": "To increase their love for Akshar-Purushottam Maharaj, renunciants should always imbibe the virtues of nishkām, nirlobh, nissvād, nissneh, nirmān, and the other ascetic qualities.",
      "gujaratiText": "Tyāgīoe Akṣhar-Puruṣhottam Mahārājne viṣhe prīti vadhāravā sāru sadā niṣhkāmpaṇu, nirlobhpaṇu, nihswādpaṇu, nihsnehpaṇu, nirmānpaṇu tathā tyāgīnā anya guṇo dhāraṇ karavā.",
      "sanskritLippy": "Tyāgibhih prīti-vṛuddhyartham Akṣhara-Puruṣhottame ।\\nNiṣhkāmatvam sadā dhāryam nirlobhatvam sadaiva cha ॥283॥\\nNihsvādatvam sadā dhāryam nihsnehatvam tathaiva cha ।\\nNirmānatvam sadā dhāryam anye cha tyāgino guṇāhā ॥284॥",
      "audioURL1": "https://baps.box.com/shared/static/fcx86miuv6tkdlytug5cetu7y870sx5v.mp3",
      "audioURL": "https://baps.box.com/shared/static/afpm25khad8m83itbt4iakw633smewen.mp3"
    },
    {
      "id": 254,
      "shlokas": "Shloka 285",
      "englishText": "Renunciants should identify their ātmā with Brahman and always offer devotion to Swaminarayan Bhagwan with divyabhāv.",
      "gujaratiText": "Tyāgīoe potānā ātmānī brahma sangāthe ekatā prāpt karīne divyabhāve sadāy Swāminārāyaṇ Bhagwānne bhajavā.",
      "sanskritLippy": "Svā’tma-brahmaikatām prāpya Swāminārāyaṇo Harihi ।\\nSarvadā bhajanīyo hi tyāgibhir divyabhāvataha ॥285॥",
      "audioURL1": "https://baps.box.com/shared/static/hd9ea6rtgles3337s2rpbi0du3nb4hru.mp3",
      "audioURL": "https://baps.box.com/shared/static/zyxmfk96y1hr2qnucra4h1j3bspqqz64.mp3"
    },
    {
      "id": 255,
      "shlokas": "Shloka 286",
      "englishText": "Renunciation is not merely self-denial; it is also endowed with devotion. Such renunciation is for attaining Akshar-Purushottam Maharaj.",
      "gujaratiText": "Tyāg e kevaḷ tyāg ja nathī parantu ā tyāg to bhaktimay chhe. Ā tyāg Akṣhar-Puruṣhottam Mahārājne pāmavā māṭe chhe.",
      "sanskritLippy": "Tyāgo na kevalam tyāgas-tyāgo bhakti-mayas-tvayam ।\\nPari-tyāgo hyayam prāptum Akṣhara-Puruṣhottamam ॥286॥",
      "audioURL1": "https://baps.box.com/shared/static/cnd8qoaafhdxgk4rv6vmiwtidfrxl9w8.mp3",
      "audioURL": "https://baps.box.com/shared/static/wjqlg17umbuc1f6vq5ih4r5msh4q3lc1.mp3"
    },
    {
      "id": 256,
      "shlokas": "Shloka 287",
      "englishText": "These principles of āgnā and upāsanā are beneficial to all; they destroy misery and bestow utmost bliss.",
      "gujaratiText": "Āgnā-upāsanā sambandhī ā siddhānto sarva-jīva-hitāvah chhe, dukh-vināshak chhe ane param-sukh-dāyak chhe.",
      "sanskritLippy": "Āgnopāsana-siddhāntāh sarva-jīva-hitāvahāhā ।\\nDukha-vināshakā ete parama-sukha-dāyakāhā ॥287॥",
      "audioURL1": "https://baps.box.com/shared/static/0ap6da6mx2d5ltayifr0s6rw8dy2bxr1.mp3",
      "audioURL": "https://baps.box.com/shared/static/ymgch51qf0uqrl23tesoh6b8amx1pa72.mp3"
    },
    {
      "id": 257,
      "shlokas": "Shloka 288-290",
      "englishText": "Those who faithfully and lovingly strengthen āgnā and upāsanā in their life according to this shastra earn the pleasure of Bhagwan and become a recipient of his grace. While living, they attain the brāhmi sthiti described in the shastras. They master ekāntik dharma. They attain the eternal and divine Akshardham of Bhagwan, ultimate moksha and bliss.",
      "gujaratiText": "Ā shāstrane anusarīne je jan shraddhā ane prītithī potānā jīvanmā āgnā-upāsanānī dṛuḍhatā kare, te Bhagwānno rājīpo prāpt karī temanī kṛupānu pātra thāy chhe. Shāstromā kahel brāhmī sthitine te jīvatā chhatā ja prāpt kare chhe. Ekāntik dharma siddha kare chhe. Bhagwānnā shāshvat, divya evā Akṣhardhāmne pāme chhe, ātyantik mukti meḷave chhe ane sukh prāpt kare chhe.",
      "sanskritLippy": "Etachchhāstrānusāreṇa yah prītyā shraddhayā janaha ।\\nĀgnopāsanayor dārḍhyam prakuryāt svasya jīvane ॥288॥\\nHarehe prasannatām prāpya tat-kṛupā-bhājano bhavet ।\\nJīvan-neva sthitim brāhmīn shāstroktām āpnuyāt sa cha ॥289॥\\nDharmaikāntika-sansiddhim āpnute divyam Akṣharam ।\\nShāshvatam Bhagavad-dhāma muktim-ātyantikīm sukham ॥290॥",
      "audioURL1": "https://baps.box.com/shared/static/v29x99rqzu9pzyvjfgt2nlot3ml27nqb.mp3",
      "audioURL": "https://baps.box.com/shared/static/b1t2csaw9fbuoo0yxy3r6zlvazk23axe.mp3"
    },
    {
      "id": 258,
      "shlokas": "Shloka 291",
      "englishText": "Attaining oneness with Aksharbrahman and offering humble devotion to Purushottam is considered to be mukti.",
      "gujaratiText": "Akṣharbrahmanu sādharmya prāpt karī Puruṣhottamnī dāsbhāve bhakti karavī e mukti mānavāmā āvī chhe.",
      "sanskritLippy": "Akṣharabrahma-sādharmyam samprāpya dāsa-bhāvataha ।\\nPuruṣhottama-bhaktir hi muktir ātyantikī matā ॥291॥",
      "audioURL1": "https://baps.box.com/shared/static/5bobidjkhr0e16yx67v00uq6t9inwq5u.mp3",
      "audioURL": "https://baps.box.com/shared/static/hd78c46o2l4uqm28oez1cl1lm5ci8fph.mp3"
    },
    {
      "id": 259,
      "shlokas": "Shloka 292",
      "englishText": "Here, in this way, āgnā and upāsanā have been concisely described. One should obtain further details from the Sampraday’s shastras.",
      "gujaratiText": "Ā rīte sankṣhepe karīne ahī āgnā tathā upāsanānu varṇan karyu. Teno vistār sampradāynā shāstro thakī jāṇavo.",
      "sanskritLippy": "Sankṣhipyā’tra kṛutam hyevam āgnopāsana-varṇanam ।\\nTad vistaram vijānīyāt sāmpradāyika-shāstrataha ॥292॥",
      "audioURL1": "https://baps.box.com/shared/static/5mkloa3w0qil74bvw6ju59cffw5jmf8u.mp3",
      "audioURL": "https://baps.box.com/shared/static/bywnqyb8ls5yezf4oyg6g57yo97zrqfn.mp3"
    },
    {
      "id": 260,
      "shlokas": "Shloka 293-294",
      "englishText": "Satsangis should daily read this ‘Satsang Diksha’ shastra with concentration. Those who are unable to read should lovingly listen to it. Moreover, all should faithfully endeavour to practise it.",
      "gujaratiText": "Satsangī janoe pratidin ā ‘Satsang-Dīkṣhā’ shāstrano ekāgra chitte pāṭh karavo. Pāṭh karavā asamarth hoya temaṇe prīti-pūrvak tenu shravaṇ karavu. Ane shraddhāthī te rīte ācharavā prayatna karavo.",
      "sanskritLippy": "Etat-Satsanga-Dīkṣheti shāstrasya prati-vāsaram ।\\nKāryah satsangibhih pāṭha ekāgra-chetasā janaihi ॥293॥\\nPaṭhane chā’samarthais-tu shravyam tat prīti-pūrvakam ।\\nĀcharitum cha kartavyah prayatnah shraddhayā tathā ॥294॥",
      "audioURL1": "https://baps.box.com/shared/static/i3w5mxmreipyhcdktr3btiqznikm3kkl.mp3",
      "audioURL": "https://baps.box.com/shared/static/88tivha5pb7m19wjd2nyab54nuwp1tvk.mp3"
    },
    {
      "id": 261,
      "shlokas": "Shloka 295-296",
      "englishText": "The Akshar-Purushottam siddhānt was established by Paramatma Parabrahman Swaminarayan Bhagwan and spread by the Gunatit gurus. This shastra is written based on this siddhānt.",
      "gujaratiText": "Paramātmā Parabrahma Swāminārāyaṇ Bhagwāne Akṣhar-Puruṣhottam siddhāntnī sthāpanā karī ane guṇātīt guruoe tenu pravartan karyu. Te siddhānt anusār ā shāstra rachyu chhe.",
      "sanskritLippy": "Paramātmā Param Brahma Swāminārāyaṇo Harihi ।\\nSiddhāntam sthāpayāmāsa hyakṣhara-Puruṣhottamam ॥295॥\\nGuravash-cha Guṇātītāsh-cha-krustasya pravartanam ।\\nVirachitam idam shāstram tat-siddhāntā’nusārataha ॥296॥",
      "audioURL1": "https://baps.box.com/shared/static/fwvb7l6vp84txek8f866r9il6e1sblcx.mp3",
      "audioURL": "https://baps.box.com/shared/static/9emxl5vx95foffkbfmikgay80e0efe8s.mp3"
    },
    {
      "id": 262,
      "shlokas": "Shloka 297-298",
      "englishText": "To grant moksha to the mumukshus, the compassionate Parabrahman Swaminarayan Bhagwan manifested on this earth out of sheer grace. For all devotees who sought refuge he provided for their well being and prosperity. He benefited them both in this world and beyond.",
      "gujaratiText": "Parabrahma dayāḷu Swāminārāyaṇ Bhagwān kṛupāe karīne ja mumukṣhuonā mokṣha māṭe ā lokmā avataryā. Sakaḷ āshrit bhaktonā yog-kṣhemnu vahan karyu ane ā lok tathā paralok em banne prakārnu emaṇe kalyāṇ karyu.",
      "sanskritLippy": "Kṛupayaivā’vatīrṇo’tra mumukṣhu-mokṣha-hetunā ।\\nParabrahma dayālur hi Swāminārāyaṇo bhuvi ॥297॥\\nSakalā’shrita-bhaktānām yoga-kṣhemau tathā’vahat ।\\nVyadhāt sa dvi-vidham shreya āmuṣhmikam tathaihikam ॥298॥",
      "audioURL1": "https://baps.box.com/shared/static/qykqky0j9cle28rm2xk2f3tw6p3si0yi.mp3",
      "audioURL": "https://baps.box.com/shared/static/erom6wrw3wdnq7qu6ngckxzcmuaiw4pe.mp3"
    },
    {
      "id": 263,
      "shlokas": "Shloka 299",
      "englishText": "May the divine, compassionate blessings of Paramatma Parabrahman Swaminarayan Bhagwan always shower everywhere.",
      "gujaratiText": "Sarvatra Paramātmā Parabrahma Swāminārāyaṇ Bhagwānnā divya kṛupāshiṣh sadā varase.",
      "sanskritLippy": "Sarvatraivā’bhivarṣhantu sadā divyāh kṛupā’shiṣhaha ।\\nParamātma-Parabrahma-Swāminārāyaṇa-Prabhoho ॥ 299॥",
      "audioURL1": "https://baps.box.com/shared/static/qkltjaessbv64npwgfz8slu64vp9i707.mp3",
      "audioURL": "https://baps.box.com/shared/static/3ojx51vhbf5dob49n7tdmx6z5hgvzutz.mp3"
    },
    {
      "id": 264,
      "shlokas": "Shloka 300",
      "englishText": "May all grief, the three types of miseries, calamities, distresses, ignorance, doubts and fears of all be destroyed.",
      "gujaratiText": "Sarvenā sarva dukho, traṇ tāp, upadravo, klesho, agnān, sanshayo tathā bhay vināsh pāme.",
      "sanskritLippy": "Sarveṣhām sarva-dukhāni tāpa-trayam upadravāhā ।\\nKleshās-tathā vinashyeyur agnānam sanshayā bhayam ॥300॥",
      "audioURL1": "https://baps.box.com/shared/static/01uu7qswx57rksklyvf3dnrv56qwhd50.mp3",
      "audioURL": "https://baps.box.com/shared/static/dhcb9w1rs188co7q2gabyxo24ks0ha8h.mp3"
    },
    {
      "id": 265,
      "shlokas": "Shloka 301",
      "englishText": "Through Bhagwan’s grace, may all attain good health, happiness, utmost peace and ultimate moksha.",
      "gujaratiText": "Bhagwānnī kṛupāthī sarve nirāmay swāsthya, sukh, param shānti tathā param kalyāṇ pāmo.",
      "sanskritLippy": "Bhagavat-kṛupayā sarve svāsthyam nirāmayam sukham ।\\nPrāpnuvantu parām shāntim kalyāṇam paramam tathā ॥301॥",
      "audioURL1": "https://baps.box.com/shared/static/6uco0ppa3n36dvpcg6s71pvstajnz7j0.mp3",
      "audioURL": "https://baps.box.com/shared/static/2223sqhb2x2rcy0mk7he3h43jq0a3o1v.mp3"
    },
    {
      "id": 266,
      "shlokas": "Shloka 302",
      "englishText": "May no one harm or hate others. May everyone always respect each other.",
      "gujaratiText": "Koī manuṣhya koīno droh tathā dveṣh na kare. Sarve sadāy paraspar ādar seve.",
      "sanskritLippy": "Na kashchit kasyachit kuryād droham dveṣham tathā janaha ।\\nSevantām ādaram sarve sarvadaiva parasparam ॥302॥",
      "audioURL1": "https://baps.box.com/shared/static/z1clof349ougguscdk6ww8o7rjz54z2p.mp3",
      "audioURL": "https://baps.box.com/shared/static/4luwwkzbyftmfgbdflfa4ko6xcv0folr.mp3"
    },
    {
      "id": 267,
      "shlokas": "Shloka 303",
      "englishText": "May everyone develop firm love, conviction and unwavering belief in Akshar-Purushottam, and may everyone’s faith forever flourish.",
      "gujaratiText": "Akṣhar-Puruṣhottamne viṣhe sarvane dṛuḍh prīti, niṣhṭhā, nishchay thāy ane vishvās sadāy vṛuddhi pāme.",
      "sanskritLippy": "Sarveṣhām jāyatām prītir dṛaḍhā niṣhṭhā cha nishchayaha ।\\nVishvāso vardhatām nityam Akṣhara-Puruṣhottame ॥303॥",
      "audioURL1": "https://baps.box.com/shared/static/nu0x35spn49zpk8m9al9nn8e4jcbphkm.mp3",
      "audioURL": "https://baps.box.com/shared/static/0547kyhqqjbjkvhf5yh986p1l9fxscaj.mp3"
    },
    {
      "id": 268,
      "shlokas": "Shloka 304",
      "englishText": "May all devotees become resolute in following dharma and attain the pleasure of Sahajanand Paramatma.",
      "gujaratiText": "Sarve bhakto dharma pāḷavāmā baḷiyā thāy ane Sahajānand Paramātmānī prasannatā prāpt kare.",
      "sanskritLippy": "Bhavantu balinah sarve bhaktāsh-cha dharma-pālane ।\\nĀpnuyuh Sahajānanda-Parātmanah prasannatām ॥304॥",
      "audioURL1": "https://baps.box.com/shared/static/7f8kltkrffk4bv5ygc9vn5k2s3p1mcvt.mp3",
      "audioURL": "https://baps.box.com/shared/static/ezybcldkfmma2lxd2x0svp2myeaelwh8.mp3"
    },
    {
      "id": 269,
      "shlokas": "Shloka 305",
      "englishText": "May the world be filled with people who are peaceful, righteous and engrossed in spiritual endeavours, and who tread the path of spirituality.",
      "gujaratiText": "Sansār prashānt, dharmavān, sādhanāshīl tathā adhyātma-mārge chālanārā manuṣhyothī yukta thāy.",
      "sanskritLippy": "Prashāntair jāyatām yukto manuṣhyair dharma-shālibhihi ।\\nSansārah sādhanā-shīlair adhyātma-mārga-sansthitaihi ॥305॥",
      "audioURL1": "https://baps.box.com/shared/static/y4bys3w65gchukm1dlffh3b7h7dwf7cf.mp3",
      "audioURL": "https://baps.box.com/shared/static/ax7q73n208yrgciv20pmprb8iyxir5ao.mp3"
    },
    {
      "id": 270,
      "shlokas": "Shloka 306",
      "englishText": "May mutual unity, suhradbhāv, friendship, compassion, tolerance and love flourish among all people.",
      "gujaratiText": "Sarva manuṣhyomā paraspar ekatā, suhṛudbhāv, maitrī, karuṇā, sahan-shīlatā tathā sneh vṛuddhi pāme.",
      "sanskritLippy": "Aikyam mithah suhṛud-bhāvo maitrī kāruṇyam eva cha ।\\nSahana-shīlatā snehah sarva-janeṣhu vardhatām ॥306॥",
      "audioURL1": "https://baps.box.com/shared/static/pscm88ybeitj2rill4rjfomgebr74t6j.mp3",
      "audioURL": "https://baps.box.com/shared/static/hbfv0udf9b554cqsb9ma5g7qxstkaq9z.mp3"
    },
    {
      "id": 271,
      "shlokas": "Shloka 307",
      "englishText": "Through the divine association of Brahman and Parabrahman, may all strengthen nirdoshbhāv and divyabhāv towards the Satsang.",
      "gujaratiText": "Brahma tathā Parabrahmanā divya sambandhe karīne satsangne viṣhe sarvane nirdoṣhbhāv tathā divyabhāvnī dṛuḍhatā thāy.",
      "sanskritLippy": "Satsange divya-sambandhād Brahmaṇah Parabrahmaṇaha ।\\nSarveṣhām jāyatām dārḍhyam nirdoṣha-divya-bhāvayoho ॥307॥",
      "audioURL1": "https://baps.box.com/shared/static/zzr6243aa4qskqwzu7nnnatsedzzmmtm.mp3",
      "audioURL": "https://baps.box.com/shared/static/n9teusnz958kq5ultg22ed1w64cghkj2.mp3"
    },
    {
      "id": 272,
      "shlokas": "Shloka 308",
      "englishText": "May all identify their ātmā as aksharrup and offer devotion to Purushottam Sahajanand.",
      "gujaratiText": "Sarva jano potānā ātmāne viṣhe akṣharrūptā prāpt karī Puruṣhottam Sahajānandnī bhakti prāpt kare.",
      "sanskritLippy": "Akṣhara-rūpatām sarve samprāpya svātmani janāhā ।\\nPrāpnuyuh Sahajānande bhaktim hi Puruṣhottame ॥308॥",
      "audioURL1": "https://baps.box.com/shared/static/nns4y071swwmqbd1h865o44ya4gyeu6d.mp3",
      "audioURL": "https://baps.box.com/shared/static/k8odpqgj5snxa7gfs1znixv1bwijkmvz.mp3"
    },
    {
      "id": 273,
      "shlokas": "Shloka 309-310",
      "englishText": "The writing of this shastra began on Magha (Maha) sud 5 [30 January 2020 CE] of Vikram Samvat 2076 and was completed on Chaitra sud 9 [2 April 2020 CE], on the divine birthday celebration of Swaminarayan Bhagwan.",
      "gujaratiText": "Vikram samvat 2076nā Māgh shukla panchamīe ā shāstra lakhavāno ārambh karyo ane Chaitra sud navamīe Swāminārāyaṇ Bhagwānnā divya janma-mahotsave te sampūrṇ thayu.",
      "sanskritLippy": "Māghasya shukla-panchamyām ārabdham asya lekhanam ।\\nPavitre vikramābde hi rasarṣhi-kha-dvi-sanmite ॥309॥\\nChaitra-shukla-navamyām cha Swāminārāyaṇa-Prabhoho ।\\nTach-cha sampūrṇatām prāptam divya-janma-mahotsave ॥310॥",
      "audioURL1": "https://baps.box.com/shared/static/7eesj6wpzlgtzjum6nycrsimv5lsuhoc.mp3",
      "audioURL": "https://baps.box.com/shared/static/zj2ocsma6qfonfx776p2opwzwiwb30dr.mp3"
    },
    {
      "id": 274,
      "shlokas": "Shloka 311-314",
      "englishText": "On the occasion of Pramukh Swami Maharaj’s birth centenary celebrations, this shastra is being offered with joy and devotion as a tribute to: (1) Parabrahman Sahajanand Shri Hari – the focus of upāsanā, (2) Mul Akshar Gunatitanand Swami, (3) Bhagatji Maharaj – the embodiment of wisdom, (4) Yagnapurushdasji (Shastriji Maharaj) – the protector of the true siddhānt, (5) the forever affectionate and blissful embodiment of Aksharbrahman, Yogiji Maharaj and (6) Guru Pramukh Swami Maharaj, who is humble and revered throughout the world.",
      "gujaratiText": "Upāsya Parabrahma Sahajānand Shrīhari tathā Mūḷ Akṣhar Guṇātītānand Swāmī, sākṣhād gnān-mūrti samā Bhagatjī Mahārāj, satya siddhāntnā rakṣhak evā Yagnapuruṣhdāsjī (Shāstrījī Mahārāj), sadāy vātsalya-bhīnā ane ānandmay brahma evā Yogījī Mahārāj tathā vishva-vandya ane vinamra evā guru Pramukh Swāmī Mahārājne ā shāstrarūpī anjali Pramukh Swāmī Mahārājnā janma shatābdī parve sānand bhakti-bhāve arpaṇ karavāmā āve chhe.",
      "sanskritLippy": "Upāsya-Sahajānanda-Haraye Parabrahmaṇe ।\\nMūlā’kṣhara-Guṇātītānandāya Swāmine tathā ॥311॥\\nBhagatajī-Mahārāja-sākṣhād-vignāna-mūrtaye ।\\nYagnapuruṣhadāsāya satya-siddhānta-rakṣhiṇe ॥312॥\\nVātsalyā’rdrā’tmane nityam ānanda-brahma-yogine ।\\nVishva-vandya-vinamrāya gurave Pramukhāya cha ॥313॥\\nAnjalih shāstra-rūpo’yam sānandam bhakti-bhāvataha ।\\nArpyate Pramukha-Swāmi-janma-shatābdi-parvaṇi ॥314॥",
      "audioURL1": "https://baps.box.com/shared/static/x9yhq9wuxfs587z4x387ky9m4hj7iq0p.mp3",
      "audioURL": "https://baps.box.com/shared/static/7zn4pe5afm6wj0p1436jv1ul7hpukoqy.mp3"
    },
    {
      "id": 275,
      "shlokas": "Shloka 315",
      "englishText": "May Swaminarayan Bhagwan, that is, Akshar-Purushottam Maharaj himself, spread supreme bliss and auspiciousness throughout the entire world.",
      "gujaratiText": "Swāminārāyaṇ Bhagwān eṭale ke sākṣhāt Akṣhar-Puruṣhottam Mahārāj sakaḷ vishvamā param ānand-mangaḷne vistāre.",
      "sanskritLippy": "Tanotu sakale vishve paramānanda-mangalam ।\\nSwāminārāyaṇah sākṣhād Akṣhara-Puruṣhottamaha ॥315॥",
      "audioURL1": "https://baps.box.com/shared/static/i798ktdn57cyg83qt080kcxxopt7bxxx.mp3",
      "audioURL": "https://baps.box.com/shared/static/90z1ymnu8oe0mhbw0y85c7q27fvjjz1l.mp3"
    }
  ]

// Function to upload shlokas to Firestore
const uploadShlokas = async () => {
  try {
    const docRef = db.collection('SCubedData').doc('SatsangDikshaData');
    await docRef.set({ data: shlokas });
    console.log('Shlokas uploaded successfully');
  } catch (error) {
    console.error('Error uploading shlokas:', error);
  }
};

// Execute the upload function
uploadShlokas();
