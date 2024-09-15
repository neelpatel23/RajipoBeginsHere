const admin = require('firebase-admin');
const serviceAccount = require('../scubed-eda81-firebase-adminsdk-cr7u1-d020a27ef1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Initialize Firestore database

// Your shloka data
const shlokas = [
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
      "id": 56,
      "shlokas": "Shloka 64-65",
      "englishText": "The meaning of this mantra is as follows:\\n“O Sahajanand Shri Hari! O Purushottam! O Aksharbrahman Gunatit gurus! Please shower compassion [upon me] and awaken. Please come forth from my ātmā, to accept my puja. I become more blessed due to your divine presence and darshan.”",
      "gujaratiText": "Āhvān mantra ā pramāṇe chhe:\\nUttiṣhṭha Sahajānanda Shrī-Hare Puruṣhottama ।\\nGuṇātītākṣhara brahmann-uttiṣhṭha kṛupayā guro ॥\\nĀgamyatām hi pūjārtham āgamyatām mad-ātmatah ।\\nSānnidhyād darshanād divyāt saubhāgyam vardhate mama ॥",
      "sanskritLippy": "Āhvāna-mantrash-chaivam vidhaha:\\nUttiṣhṭha Sahajānanda Shrī-Hare Puruṣhottama ।\\nGuṇātītā’kṣhara Brahmann-uttiṣhṭha kṛupayā guro ॥64॥\\nĀgamyatām hi pūjārtham āgamyatām mad-ātmataha ।\\nSānnidhyād darshanād divyāt saubhāgyam vardhate mama ॥65॥",
      "audioURL1": "https://baps.box.com/shared/static/46ohjxe4y1amx66y09eq0ctmfgpqqs1p.mp3",
      "audioURL": "https://baps.box.com/shared/static/jp3ffndpefr5x05fkpdi7k7qoerbezed.mp3"
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
      "id": 141,
      "shlokas": "Shloka 164",
      "englishText": "One should never speak untruth. One should express truth that is beneficial, but not utter even truth that may harm others.",
      "gujaratiText": "Asatya kyārey na bolavu. Hit kare tevu satya bolavu. Anyanu ahit kare tevu satya paṇ na bolavu.",
      "sanskritLippy": "Asatyam na vadet kvāpi vadet satyam hitā’vaham ।\\nSatyam api vaden-naiva yat syād anyā’hitā’vaham ॥164॥",
      "audioURL1": "https://baps.box.com/shared/static/ofkjijornufd0ouqhmhp40ixdf413ahc.mp3",
      "audioURL": "https://baps.box.com/shared/static/5o5boc5uz5ol1uy4joyc4lp4rfs7wh4o.mp3"
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
      "id": 200,
      "shlokas": "Shloka 225",
      "englishText": "One should avoid the company of those who are lax in observing niyams or see human traits in the manifest form of Bhagwan or the guru.",
      "gujaratiText": "Je manuṣhya pratyakṣh Bhagwānmā ane gurumā manuṣhyabhāv joto hoy ane niyam pāḷavāmā shithil hoy teno sang na karavo.",
      "sanskritLippy": "Harau gurau cha pratyakṣhe manuṣhya-bhāva-darshanaha ।\\nShithilo niyame yash-cha na tasya sangam ācharet ॥225॥",
      "audioURL1": "https://baps.box.com/shared/static/2di1sg61xzy2xzwdk098d9seyvkoq1nq.mp3",
      "audioURL": "https://baps.box.com/shared/static/qiyhkm6lu8z6lxyryodlhpcbk5ua7ylt.mp3"
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
      "id": 244,
      "shlokas": "Shloka 274",
      "englishText": "Observing dharma and niyams elevates the quality of one’s life and also inspires others to live righteously.",
      "gujaratiText": "Dharma-niyam pāḷavāthī jīvan unnat thāy chhe ane anyane paṇ sadāchār pāḷavānī preraṇā maḷe chhe.",
      "sanskritLippy": "Jīvanam unnatim yāti dharma-niyama-pālanāt ।\\nAnyashchā’pi sadāchāra-pālane prerito bhavet ॥274॥",
      "audioURL1": "https://baps.box.com/shared/static/6tgq7si47kcymlfskg9zb4f1fp9bkd9s.mp3",
      "audioURL": "https://baps.box.com/shared/static/jggkpmawhmr7bmng2y9e6s1fdhlea1t9.mp3"
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
      "shlokas": "Gun Grahan Drashti",
      "englishText": "5 good qualities for 1 bad - Whether you find yourself in an intense and stressful environment or a calm and peaceful one, maintaining positive thoughts about others can be challenging. A helpful approach is to replace every negative thought or action with five positive qualities or characteristics.",
      "gujaratiText": "Yogiji Maharaj boarded a train. It was a stuffy compartment, and on the facing bench were seated some carefree youngsters. Once the train picked up motion, Yogiji closed his eyes and began to sing a devotional song; he was soon lost in love for the Lord. His resonant voice, its sweet and soothing tone filtered through the atmosphere. ‘Anubhavi anandma brahmarasana bhogi re.......Yet these divine words pricked the ears of the youngsters. They were blatant and impudent, and highly inflammable. ‘Stop your foolish singing ! It's disturbing us!‘ they complained vehemently and resumed their game of cards that had them glued. Before a fellow sadhu could explain in defense, Yogiji Maharaj, abruptly stopped singing and took out his rosary to quietly chant the name of the Lord. For him, the name of the Lord was important, not the manner. The train moved along and Yogiji remained steady in devotion, while the youths sank deeper and deeper into the excitement of cards. Game after game, they continued ceaselessly. Then suddenly, one of them realized that they had missed their station. The train had passed it a long time ago. Instantly, their joy vanished. They grew agitated and frantic, not knowing what to do. Quite pleased to see them in trouble, the sadhu quipped, ‘See Swamiji, they insulted you and stopped you from singing the Lord's song. This is why they've missed their destination. They deserved it...‘ But Yogiji intervened; ‘No, one should not say that. Just think how deeply engrossed they were in playing cards that they forgot everything else; we too, should become so engrossed in devotion to God.‘ Perhaps the sadhu could not instantly see goodness in the youngsters, but he did sense the great-heartedness of his Guru. Yogiji never ever found fault with others.",
      "sanskritLippy": "N/A",
    },
    {
      "id": 260,
      "shlokas": "SAMP",
      "englishText": "Once some doves were happily feeding on some seeds when all of a sudden a bird-catcher's net fell on them and trapped them. Immediately all the doves started screaming and flapping their wings in confusion. But then one Superintendent dove, as Yogiji Maharaj called it, got up and told the others: Listen! If we flap our wings like this randomly, we won't be able to lift the net. Let's become one and flap together with synchronicity. When they did this they were able to lift the net. They all descended on a distant tree and the net remained stuck on the branches and all the doves escaped. No single dove on its own was capable of lifting the net. But when they worked together as a team they accomplished what was impossible for any individual dove to achieve. The whole is always greater than the sum of the parts.",
      "gujaratiText": "Odarka and Kukad are two villages in Gujarat. These two villages and their allied villages had been fighting a bloody war for the past four generations. What started as a duel between the armed men of two villagers had escalated into a dangerous situation. Dozens of individuals were killed, and the villages severed all relations. As a sign of their hatred for each other, villagers followed the Apaiya tradition in which they would not drink water from each other’s villages. Many tried to settle the bad blood between the villages, such as the British Raj, the Independent Government of the Indian Republic, and even local religious leaders, but all were unsuccessful. Pramukh Swami Maharaj invited the leaders from both of the villages to meet and discuss their differences. After a few meetings and hours of mediation, Pramukh Swami Maharaj had finally settled the feud, bringing peace to a total of 45 villages.",
      "sanskritLippy": "N/A",
    },
    {
      "id": 261,
      "shlokas": "Abhav Avgun",
      "englishText": "Talk about how to avoid and the detrimental effect on relationships",
      "gujaratiText": "4 AUGUST 2017, LOS ANGELES, USA - In the evening assembly, Swamishri narrated “I was a parshad at the time. I was with a devotee from the time of Shastriji Maharaj. We were seated on a train in a packed service compartment. In a space for 10 people, 20 were seated. Not an inch of space. The devotee started talks of abhav-avgun. He was very senior, and there was nowhere for me to go. I did not like it, so I started chanting ‘Swaminarayan, Swaminarayan…’ in my mind. But, I had to listen to him. “When we reached Ahmedabad mandir, Yogi Bapa asked. ‘What did you talk about on the train?’ Normally, he would not ask, but this time he did. I replied, ‘Abhav-avgun.’ Immediately, he said to me, ‘Two fasts.’ He told the other person to do one. So, if one takes avgun of devotees, one’s ignorance deepens and if one takes their gun, one becomes enlightened. So, in every way, such talks have to be removed.”",
      "sanskritLippy": "N/A",
    },
    {
      "id": 262,
      "shlokas": "Mahima of mandir and haribhakta",
      "englishText": "In 1999, a fisherman’s son met with a serious accident in Valsad. He was rushed to the Mahavir General Hospital in Surat. On hearing about the boy’s critical condition, Swamishri was pained and concerned for his life. A few days later Swamishri arrived in Surat. One morning, Swamishri suddenly expressed his wish to visit the boy. Within no time Swamishri left for the hospital. His car could not reach the hospital gate because of heavy roadwork. So, Swamishri walked along the uneven, excavated road with the help of his attendant sadhus. Despite his fragile health at eighty years, Swamishri reached the hospital and went to the intensive care unit. He gently and compassionately touched the unconscious boy’s head and heart with his hands and called out to him, “Prashant, Jai Swaminarayan...” Then he placed a garland of flowers around his neck and chanted the Swaminarayan mantra, praying for his recovery. Once again Swamishri blessed Prashant and consoled his father, Shantilal, assuring him that his son would get all the help and care needed. On leaving the hospital, Swamishri once again went through the ordeal of jumping the two-and-a-half-feet wide ditches with the help of his attendant sadhus and then walked a quarter of a kilometer back to his car. After blessing Prashant, Swamishri felt satisfied for offering his sympathy and prayers for an innocent, suffering boy. There was no fatigue on Swamishri’s face for having taken out time from his busy schedule and going through all the discomfort and difficulties for a poor, ailing boy. Later, Prashant recovered fully.",
      "gujaratiText": "It was the year 1940, and Shastriji Maharaj had just given diksha to Pramukh Swami Maharaj, also known as Narayanswarupdas Swami Swami or by the nickname of “Narayanda”.  During that year the Atladra mandir was under construction. There were a lot of seva in the mandir. At that time, Shastriji Maharaj told the young and energetic Narayanswarupdas Swami Swami to join in the seva.  The service that Shastriji Maharaj had asked Narayanswarupdas Swami Swami to join was the lime crushing seva.  He had to use his bare feet to crush the lime, for many hours.  When lime is mixed with water and crushed, it becomes very hot.  On top of this, it was mid-summer.  Imagine how hot it must be! Now many devotees and sadhus were helping doing this seva, but as hours went by, they started leaving because they couldn’t stand the heat.  Each hour more people left, and towards the end only Narayanswarupdas Swami Swami was left.  Everyone told Swami, “Swami, leave you are going to go blind by the heat from the lime.”  Narayanswarupdas Swami Swami replied, “Shastriji Maharaj has asked me to do this seva so no matter what it takes I will finish this seva.” Swami finished the seva, but the heat had gotten to him.  Swami had burning red blisters all over his body.  His body was hot from the fever.   At night Swami could barely sleep.  He was in pain from the blisters and the fever. The next day Shastriji Maharaj found out and called Narayanswarupdas Swami Swami to him.  Shastriji Maharaj gently touched Narayanswarupdas Swami Swami’s entire body, soothing away the pain with his hands. “You’ll be well soon,” Shastriji Maharaj promised.  Several days later Narayanswarupdas Swami Swami rejoined the construction work at the mandir.  The blisters had completely disappeared except a red stain on the tip of his nose.",
      "sanskritLippy": "After lunch, Swamishri proceeded towards his room while greeting devotees on the way.A devotee from Ahmedabad named Shyamalbhai was standing in the line holding his young child Ravi in his arms. Whenever Swamishri sees a child, he always stops to give blessings by plaçing his hand on the top of the child's head. The same thing happened here. Just as Swamishri kept his hand on Ravi's head, Ravi also stretched his small hand to keep it on Swamishri's head. Seeing this, his father stopped Ravi from doing so. But Swamishri stood there laughing, waiting for Ravi to put his hand on his head. He humbly said twice, ‘Place your hand...‘ Swamishri has never hesitated to take blessings from a child even though he is the guru of so many.",
    },
    {
      "id": 263,
      "shlokas": "Gnan 101",
      "englishText": "N/A",
      "gujaratiText": "N/A",
      "sanskritLippy": "N/A"
    },
    {
      "id": 264,
      "shlokas": "Famous Prasangs",
      "englishText": "Ramsang Bapu - From a thug to a bhakta - There is a small village called Odarka in the Saurashtra region. Odarka was known as the home of the infamous Ramsang Bapu (Ramsinhji Takhatsinhji Gohil). He was a skilled fighter and thief. He didn’t bother stealing from people or businesses, Ramsang Bapu terrorized villages! He was so good at what he did that Bhupat, a nationally feared gangster, offered a partnership. Bhupat had told Ramsang Bapu that with you on my side, I can rattle the national government. He offered half his profits to Ramsang Bapu, but Ramsingh Bapu was not interested in such high profile action. Describing his original nature, he would say, ‘If you had seen me before, you would have thought I was Ravan and Kansa’s brother! I was destined to die a very painful and humiliating death, but Pramukh Swami Maharaj changed my life.‘ Swamishri visited his house in Odarka and talked to him about the repercussions of violence, theft and hurting others. Ramsang Bapu followed Swamishri’s wish and started to live a morally pure life, giving up his vices and violent ways. Ramsang Bapu was no longer a thug or gangster. Pramukh Swami Maharaj had made him a devotee. His transformation helped the entire region sleep better at night. For the rest of his days, Ramsang Bapu lived a pious life based on the codes of satsang.",
      "gujaratiText": "Take a needle to heaven - There lived a wealthy sheth, but he was a scrooge – mean and miserly. He never spent a rupee, never donated a paisa, and always wore worn shoes and tattered clothes. One day, he fell seriously ill and became bedridden. During his whole life, it was said, he had only one friend, his personal tailor. But unfortunately, he had died a few months earlier. Everyone knew the sheth’s days were numbered. One by one his family and neighbors came to pay their formal respects. When the tailor’s son arrived, the sheth said, ‘It seems that I will not last long here. My moment to rise to Swarg has come.‘ The young boy, though only 15 years old, was very wise. He knew of the sheth’s craving for wealth and miserliness. He replied, ‘O sheth, my father is already in Swarg. He often told me that he wished to sew rich garments for the Lord. But he forgot to take his needle with him. Will you please take this needle with you and give it to him.‘ ‘Oh, alright, I’ll be happy to do that,‘ he agreed. The sheth was happy to do anything as long as it did not involve any giving. He took the needle and gave the boy permission to leave. Alone, in his bed, he began wondering ‘Where shall I place the needle? Pin it to my shirt? No, that won’t do. All my clothes will burn away on my funeral pyre. In my mouth. Yes, I’ll place the needle in the bulge of my cheek.‘ Then again, he had second thoughts, ‘But my whole body will be burnt to ashes. How am I to carry this small needle to Swarga?‘ The more he thought about it the more confused he became. Finally, he called the tailor’s boy and said, ‘Son, here, take your needle back. I won’t be able to take it to Swarg.‘ ‘But,‘ the boy looked amused, ‘if you are going to carry all your millions of rupees to Swarg, then why can’t you carry one little needle?‘ The sheth’s inner eye was opened. He realized that none of his wealth or property would accompany him after death. He prayed to God to forgive him for all his past wickedness and promised to profusely donate his wealth in charity should he survive the illness. God cured him and he kept his word. He built a grand mandir, fed thousands and comforted the less fortunate people.",
      "sanskritLippy": ""
    },
  ]



  // Character (‘)
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
